import Layout from '@/layout'

export default {
  path: '/employees', // 员工页面
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees'),
      meta: {
        title: '员工', // 默认路由标题
        icon: 'people'
      }

    }
  ]
}
