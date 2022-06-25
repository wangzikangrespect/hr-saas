// 设置存储方法
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
// 设置读取方法
export const getItem = key => {
  let value = window.localStorage.getItem(key)
  // 如果value为json格式则进行解析，否则就直接读取
  try {
    value = JSON.parse(value)
    return value
  } catch (err) {
    return value
  }
}
// 设置删除方法
export const removeItem = key => {
  localStorage.removeItem(key)
}
