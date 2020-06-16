// 导入了 vue
import Vue from 'vue'
// 导入了 App
import App from './App.vue'
// 导入了 router
import router from './router'
// 导入了 store
import store from './store'
// 导入 vant  lazyload懒加载
import Vant, { Lazyload, Toast } from 'vant'
// 导入 vant样式
import 'vant/lib/index.css'
// 导入图标
import './style/index.css'
// 导入过滤器
import './filter/myfilter'
// 使用 vant
Vue.use(Vant)
// 使用Lazyload
Vue.use(Lazyload)
// 使用
Vue.use(Toast)
Vue.config.productionTip = false

// console.log('----------------dayjs使用-----------------')
// var tiem = dayjs().format(dayjs('1990'))
// console.log(tiem)
// console.log('----------------dayjs使用-----------------')

// 封装一个全局登录的方法
Vue.prototype.$login = function () {
  // 1. 得到 用户的 token
  const token = store.state.userInfo.token
  // 2. 判断 token 是否存在
  if (token) {
    return true
  } else {
    // 提示未登录
    Toast.fail('对不起你未登录,请先登录')
    // 跳转到登录页面
    router.push('/login')
    return false // 说明没有登录
  }
}
// 创建了一个vue 实例
new Vue({
  router, // 挂载路由
  store, // 挂载 vuex
  render: h => h(App) // 渲染了 App
}).$mount('#app')
