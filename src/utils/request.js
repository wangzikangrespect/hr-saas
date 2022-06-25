import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeKey } from '@/utils/auth'
const timeout = 3600

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => { // 封装axios请求拦截器
  if (store.getters.token) { // 如果store.getters.token有值，则给请求头添加token
    // 检查如果时间戳小于时间间隔则继续，否则跳转到登录页面
    if (checkIsTimeout()) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    } else {
      store.dispatch('user/logout') // 删除本地存储的token和时间戳
      router.push('/login') // 将页面跳转至登录页
      return Promise.reject(new Error('token超时，请重新登录'))
    }
  }
  return config
}
, error => {
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候 表示 后端告诉我token超时了
    store.dispatch('user/logout') // 登出action 删除token
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error)
}
)

// response interceptor
service.interceptors.response.use(
  response => {
    // 解构获取返回数据
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error('请求参数有误'))
    }
  }, err => {
    Message.error(err)
  }

  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  // response => {
  //   const res = response.data

  //   // if the custom code is not 20000, it is judged as an error.
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message || 'Error',
  //       type: 'error',
  //       duration: 5 * 1000
  //     })

  //     // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // to re-login
  //       MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
  //         confirmButtonText: 'Re-Login',
  //         cancelButtonText: 'Cancel',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('user/resetToken').then(() => {
  //           location.reload()
  //         })
  //       })
  //     }
  //     return Promise.reject(new Error(res.message || 'Error'))
  //   } else {
  //     return res
  //   }
  // },
  // error => {
  //   console.log('err' + error) // for debug
  //   Message({
  //     message: error.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   return Promise.reject(error)
  // }

)
const checkIsTimeout = () => {
  const gapTime = Date.now() - getTimeKey() // 用当前时间戳减去之前时间戳
  return gapTime / 1000 < timeout
}

export default service
