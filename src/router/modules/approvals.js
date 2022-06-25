import Layout from '@/layout'

export default {
  path: '/approvals', // 员工页面
  component: Layout,
  children: [
    {
      path: '',
      name: 'approvals',
      component: () => import('@/views/approvals/index'),
      meta: {
        title: '审批', // 默认路由标题
        icon: 'tree-table'
      }
    }
  ]
}
