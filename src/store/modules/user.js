import { login, getInfo, getUserBaseId } from '@/api/user'
import { getToken, setToken, removeToken, setTimeKey, removeTime } from '@/utils/auth'
// import { reject } from 'core-js/fn/promise'
import { Message } from 'element-ui'
// import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userInfo: {}

}

const mutations = {
  setToken(state, token) { // 修改本地token值
    state.token = token
    setToken(token)
    setTimeKey()
  },
  removeToken() { // 删除本地的token值
    state.token = null
    removeToken()
    removeTime()
  },
  // 设置用户信息
  setUserInfo(state, info) {
    state.userInfo = info
  },
  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {} // 删除用户信息
  },
  // 设置用户头像
  setUserPhoto(state, userPhoto) {
    state.userPhoto = userPhoto
  }

}

const actions = {
  // 发起登录请求并获取资料
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
    Message('登录成功')
  },
  // 获取用户资料
  async getUserInfo(context) {
    const result = await getInfo()
    const req = await getUserBaseId(result.userId)
    const baseResult = { ...result, ...req }
    context.commit('setUserInfo', baseResult)
    return baseResult
  },
  // 退出登录
  logout(context) {
    context.commit('removeToken') // 删除本地token
    context.commit('reomveUserInfo') // 删除本地用户信息
  }
}

// remove token

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

