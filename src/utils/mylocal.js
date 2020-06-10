// 封装所有对 localostrage 的操作

// 封装一个储存数据到 localostrage中的方法
function localSet (key, value) {
  //   window.localStorage.setItem('userInfo', JSON.stringify(res.data.data)) 相对于
  window.localStorage.setItem(key, JSON.stringify(value))
}
// 封装一个从 localostrage 中获取数据的方法
function localGet (key) {
  return JSON.parse(window.localStorage.getItem(key))
}
// 封装一个从 localostrage 中删除的方法
function removeLoacl (key) {
  window.localStorage.removeItem(key)
}

// 导出
export {
  localSet,
  localGet,
  removeLoacl
}
