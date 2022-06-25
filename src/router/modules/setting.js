import Layout from '@/layout'

export default {
  path: '/setting', // 员工页面
  component: Layout,
  children: [
    {
      path: '',
      name: 'setting',
      component: () => import('@/views/setting'),
      meta: {
        title: '公司设置', // 默认路由标题
        icon: 'setting'
      }

    }
  ]
}
