import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入 uservant 组件
import Uservant from '../views/uservant/index.vue'
// 导入登录组件
import Login from '../views/login/index.vue'
// 导入首页组件
import Home from '../views/home/index.vue'
// 导入首页 & 我的
import Index from '../views/index/index.vue'
import My from '@/views/my/index.vue'
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
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/index',
        component: Index
      },
      {
        path: '/my',
        component: My
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
