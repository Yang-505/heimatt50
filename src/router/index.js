import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入 uservant 组件
import Uservant from '../views/uservant/index.vue'
// 导入登录组件
import Login from '../views/login/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/uservant',
    component: Uservant
  },
  {
    // 添加一个登录组件
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
