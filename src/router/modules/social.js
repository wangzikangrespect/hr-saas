import Layout from '@/layout'

export default {
  path: '/social', // 员工页面
  component: Layout,
  children: [
    {
      path: '',
      name: 'social',
      component: () => import('@/views/social'),
      meta: {
        title: '社保', // 默认路由标题
        icon: 'table'
      }

    }
  ]
}
