import Layout from '@/layout'

export default {
  path: '/attendances', // 员工页面
  component: Layout,
  children: [
    {
      path: '',
      name: 'attendances',
      component: () => import('@/views/attendances/index.vue'),
      meta: {
        title: '考勤', // 默认路由标题
        icon: 'skill'
      }

    }
  ]
}
