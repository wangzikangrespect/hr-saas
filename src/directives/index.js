// 图片错误的指令
export const getUserPhotot = {
  inserted(dom, option) {
    dom.onerror = function() { // onerror为图片加载发生错误时触发的事件
      dom.src = option.value // 将图片中的元素路径改为指定路径
    }
  }
}
