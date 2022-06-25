import { setItem, getItem, removeItem } from '@/utils/storage'

const TokenKey = 'HR-ITHEMA'

export function getToken() { // 得到token
  return getItem(TokenKey)
}

export function setToken(token) { // 存储token
  return setItem(TokenKey, token)
}

export function removeToken() { // 删除token
  return removeItem(TokenKey)
}

// 获取时间戳

const timeKey = 'TOKEN_TIMESTAMP_KEY'

export const getTimeKey = () => { // 获取时间戳
  return getItem(timeKey)
}

export const setTimeKey = () => { // 设置时间戳
  return setItem(timeKey, Date.now())
}
export const removeTime = () => { // 删除时间戳
  return removeItem(timeKey)
}
