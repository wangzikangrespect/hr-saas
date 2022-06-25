<template>
  <el-dialog v-if="addShow" :title="operTitle" :visible.sync="addShow" center :before-close="closeBtn">

    <!-- <addDepart :node="treeNode" :employee-list="employeeList" /> -->
    <el-form ref="addDepartFrom" v-loading="loading" label-width="120px" :model="newDepartInfo" :rules="rules">
      <!-- 部门名称 -->
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="newDepartInfo.name" placeholder="请输入1-300个字符" style="width:80%" />
      </el-form-item>
      <!-- 部门名称 -->
      <!-- 部门编码 -->
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="newDepartInfo.code" placeholder="请输入1-300个字符" style="width:80%" />
      </el-form-item>
      <!-- 部门编码 -->
      <!-- 部门负责人 -->
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="newDepartInfo.manager" placeholder="请选择负责人" style="width:80%">
          <el-option v-for="value in employeeList" :key="value.id" :label="value.username" :value="value.username" />
        </el-select>
      </el-form-item>
      <!-- 部门负责人 -->
      <!-- 部门介绍 -->
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="newDepartInfo.introduce" rows="4" type="textarea" placeholder="请输入1-300个字符" style="width:80%;min-height: 33px;" />
      </el-form-item>
    <!-- 部门介绍 -->
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeBtn">取 消</el-button>
      <el-button type="primary" @click="submitBtn">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
// 分别为获取公司结构数据，删除部门，获取部门信息详情，编辑部门信息
import { getDepartmentInfo, addDepartment, getDepartmentDetail, editDepatmentDetail } from '@/api/department'
export default {
  name: 'AddDepartmentIndex',
  props: {
    addShow: {
      type: Boolean,
      require: true,
      default: false
    },
    node: {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    employeeList: {
      type: Array,
      require: true,
      default() {
        return []
      }
    }
  },
  data() {
    const validataName = async(rule, value, callback) => { // 校验是否重名
      const results = await getDepartmentInfo() // 获取最新公司结构数据
      let exist = false
      if (this.newDepartInfo.id) { // 如果有id则表示为编辑模式
      // 找出说有该节点的兄弟节点放入一个数组（不包括该节点），并将该节点中的name与所有节点比较
        // 找到返回数据中该node元素下的所有子节点
        const arr = results.depts.filter(element => {
          return element.pid === this.newDepartInfo.pid && element.id !== this.newDepartInfo.id // 找出pid相同且id不同的元素组成一个数组
        })
        exist = arr.some(element => element.name === value)
      } else { // 否则为新增模式
        // 遍历数据用node.id与value.pid相同的值的名字做对比若有相同则校验失败，反之则通过
        exist = this.findBroNode(results).find(element => { // 查看数组中是否有同名的存在
          return element.name === value
        })
      }

      exist ? callback(new Error('同级别公司不可重复')) : callback()
    }
    const validataCoding = async(rule, value, callback) => { // 校验coding是否相同
      const { depts } = await getDepartmentInfo()
      let isRepeat = false
      if (this.newDepartInfo.id) { // 如果有id则表示为编辑模式
        isRepeat = depts.some(item => item.id !== this.newDepartInfo.id && item.code === this.newDepartInfo.code)
      } else { // 否则为新增模式
        isRepeat = depts.some(item => item.code === value)
      }
      isRepeat ? callback(new Error('公司编码不可重复')) : callback()
    }
    return {
      newDepartInfo: {
        name: '',
        coding: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }, {
            min: 1, max: 50, message: '长度为1-50个字符', trigger: 'blur'
          }, {
            validator: validataName, trigger: 'blur'
          }
        ],
        code: [
          {
            required: true, message: '请输入公司编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度为1-50个字符', trigger: 'blur'
          }, {
            validator: validataCoding, trigger: 'blur'
          }

        ],
        manager: [
          {
            required: true, message: '请输入公司名称', trigger: 'blur' }

        ],
        introduce: [
          {
            required: true, message: '请输入公司名称', trigger: 'blur' }, {
            min: 1, max: 300, message: '长度为1-50个字符', trigger: 'blur'
          }

        ]
      },
      loading: false
    }
  },
  computed: {
    operTitle() {
      return this.newDepartInfo.id ? '编辑部门' : '添加部门'
    }
  },
  methods: {
    findBroNode(list) { // 寻找兄弟节点
      return list.depts.filter(element => { // 找到返回数据中该node元素下的所有子节点
        return this.node.id === element.pid
      })
    },
    closeBtn() { // 关闭弹窗
      this.$refs.addDepartFrom.resetFields()
      this.$emit('update:addShow', false)
    },
    submitBtn() {
      this.loading = true
      this.$refs.addDepartFrom.validate(async isOk => {
        if (isOk) {
          // 将表单数据传出，并重新获取数据，再关闭弹窗
          if (this.newDepartInfo.id) { // 如果有id则为编辑
            try {
              await editDepatmentDetail(this.newDepartInfo.id, this.newDepartInfo)
            } catch (err) {
              this.$message.error('修改信息失败，请稍后重试')
            }
          } else { // 没id则为新建
            try {
              await addDepartment(
                { ...this.newDepartInfo, pid: this.node.id })
            } catch (err) {
              this.$message.error('添加部门失败请稍后重试')
            }
          }
          this.$emit('updateDeparts') // 通知父组件重新获取数据
          this.closeBtn() // 关闭弹窗
        } else { return }
        this.loading = false
      })
    },
    async getDepartmentDetail(id) { // 获取部门详细数据，用于编辑操作
      const data = await getDepartmentDetail(id)
      this.newDepartInfo = data
    }

  }
}
</script>

<style>

</style>
