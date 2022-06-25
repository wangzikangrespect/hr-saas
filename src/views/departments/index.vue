<template>
  <el-card class="tree-card">
    <!-- 表单头部 -->
    <treeTools
      :depart-data="company"
      :is-root="true"
      :tree-node="company"
      @add="addDepartFn"
    />
    <!-- 表单头部 -->
    <!-- 表单内容树形图 -->
    <el-tree :data="departs" :default-expand-all="true">
      <treeTools
        slot-scope="{ data, node }"
        :depart-data="data"
        :tree-node="node.data"
        @editDeparts="editDepartsFn"
        @add="addDepartFn"
        @edit="editDepartFn"
      />
    </el-tree>
    <!-- 表单内容树形图 -->
    <!-- 编辑弹窗栏 -->
    <addDepart
      ref="DialogFrom"
      :add-show.sync="addShow"
      :node="treeNode"
      :employee-list="employeeList"
      @updateDeparts="getDepartmentInfo()"
    />
    <!-- 编辑弹窗栏 -->
  </el-card>
</template>

<script>
import { getDepartmentInfo, delDepartment } from '@/api/department' // 映入axios请求
import { getEmployeeList } from '@/api/employee'
import treeTools from './component/tree-tools.vue' // 引入树形结构内容
import addDepart from './component/add-depart.vue'
export default {
  name: 'DepartmentIndex',
  components: {
    treeTools,
    addDepart
  },
  data() {
    return {
      company: {}, // 公司数据
      departs: [], // 部门结构数据
      defaultProps: {
        label: 'name'
      },
      addShow: false,
      treeNode: null,
      employeeList: []
    }
  },
  created() {
    this.getDepartmentInfo()
    this.getEmployeeList()
  },
  methods: {
    async getDepartmentInfo() {
      // 获取公司结构方法
      try {
        const result = await getDepartmentInfo()
        this.company = { name: result.companyName, manager: '负责人', id: '' }
        this.departs = this.processingData(result.depts, '')
      } catch (err) {
        this.$message.error('请求数据失败，请稍后重试')
      }
    },
    processingData(list, id) {
      // 处理获得的数据结构
      var arr = []
      list.forEach((obj) => {
        if (obj.pid === id) {
          obj.children = this.processingData(list, obj.id)
          arr.push(obj)
        }
      })
      return arr
    },
    async editDepartsFn(id) {
      await delDepartment(id)
      await this.getDepartmentInfo()
    },
    addDepartFn(node) {
      this.addShow = true
      this.treeNode = node
    },
    async getEmployeeList() {
      // 获取员工列表
      const result = await getEmployeeList()
      this.employeeList = result.rows
    },
    editDepartFn(node) {
      this.addShow = true
      this.treeNode = node
      // 调用add组件下的getdepartdetail方法获取详细数据，并且将该值给
      this.$refs.DialogFrom.getDepartmentDetail(node.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
