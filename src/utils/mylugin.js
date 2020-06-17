// 封装一个全局登录的插件
import Vue from 'vue'
// 导入 store
import store from '../store/index'
// 导入 Toast
import { Toast } from 'vant'
// 导入 router
import router from '../router/index'
// 使用
Vue.use(Toast)
// 创建一个对象
const pluginObj = {}
// 添加一个 install 方法
pluginObj.install = function (Vue) {
  // 给VUE 添加全局方法
  Vue.prototype.$login = function () {
    // 1.得到 用户的 token
    const token = store.state.userInfo.token
    // 2.判断 token 是否存在
    if (token) {
      return true
    } else {
      // 提示未登录
      Toast.fail('未登录,自动跳转登录页面')
      // 跳转到登录页面
      router.push('/checklogin')
      return false // 说明没有登录
    }
  }
}
// 导出插件对象
export default pluginObj
