// 导入了 vue
import Vue from 'vue'
// 导入了 App
import App from './App.vue'
// 导入了 router
import router from './router'
// 导入了 store
import store from './store'
// 导入 vant  lazyload懒加载
import Vant, { Lazyload } from 'vant'
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
Vue.config.productionTip = false

// console.log('----------------dayjs使用-----------------')
// var tiem = dayjs().format(dayjs('1990'))
// console.log(tiem)
// console.log('----------------dayjs使用-----------------')
// 创建了一个vue 实例
new Vue({
  router, // 挂载路由
  store, // 挂载 vuex
  render: h => h(App) // 渲染了 App
}).$mount('#app')
