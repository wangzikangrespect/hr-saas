import Layout from '@/layout'

export default {
  path: '/permission', // 员工页面
  component: Layout,
  children: [
    {
      path: '',
      name: 'permission',
      component: () => import('@/views/permission'),
      meta: {
        title: '权限管理', // 默认路由标题
        icon: 'lock'
      }

    }
  ]
}
