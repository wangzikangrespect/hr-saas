import Layout from '@/layout'

export default {
  path: '/department', // 员工页面
  component: Layout,
  children: [
    {
      path: '',
      name: 'department',
      component: () => import('@/views/departments'),
      meta: {
        title: '组织架构', // 默认路由标题
        icon: 'tree'
      }

    }
  ]
}
