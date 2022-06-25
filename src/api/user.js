import request from '@/utils/request'
// 用户登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
// 通过id获取用户的基本信息
export const getUserBaseId = id => {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
