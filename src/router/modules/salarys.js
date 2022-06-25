import Layout from '@/layout'

export default {
  path: '/salarys', // 员工页面
  component: Layout,
  children: [
    {
      path: '',
      name: 'salarys',
      component: () => import('@/views/salarys'),
      meta: {
        title: '工资', // 默认路由标题
        icon: 'money'
      }

    }
  ]
}
