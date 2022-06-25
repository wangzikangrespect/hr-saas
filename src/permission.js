import store from '@/store'
import router from '@/router'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
// 设置白名单
const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  NProgress.start() // 启动进度条
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 在有token的情况下放行则检查用户信息是否存在，不存在则调用方法获取
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  NProgress.done()// 因为直接手动输入路由地址不会触发后置路由守卫，因此需要在结束后关闭
}
)

router.afterEach((to, from) => {
  NProgress.done()// 关闭进度条
})
