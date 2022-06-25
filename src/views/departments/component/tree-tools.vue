<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 26px; width: 100%"
  >
    <el-col>{{ departData.name }}</el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end" align="middle">
        <!-- 负责人 -->
        <el-col>{{ departData.manager }}</el-col>
        <!-- 负责人 -->
        <!-- 下拉菜单 -->
        <el-col>
          <el-dropdown @command="handCommand">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="edit"
              >编辑子部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="del"
              >删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <!-- 下拉菜单 -->
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TreeTool',
  props: {
    departData: {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    isRoot: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      require: true,
      default() {
        return {}
      }
    }
  },
  methods: {
    handCommand(command) {
      if (command === 'add') {
        //        添加部门
        this.$emit('add', this.treeNode)
      } else if (command === 'edit') {
        // 编辑部门
        this.$emit('edit', this.treeNode)
      } else {
        // 删除部门
        this.$confirm('确认删除该部门？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {
            this.$emit('editDeparts', this.departData.id)
          })
          .catch(() => {
            return
          })
      }
    }
  }
}
</script>

<style>
</style>
