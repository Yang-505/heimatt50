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
// 导入搜索
import Search from '../views/search/index.vue'
// 导入搜索结果
import SearchResult from '../views/searchResult/searchResult.vue'
// 导入详情
import Detail from '../views/detail/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    // 路由重定向
    path: '/',
    redirect: '/login',
    component: Login
  },
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
    // 添加一个路由 checklogin
    path: '/checklogin',
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
      },
      {
        path: '/search',
        component: Search
      }
    ]
  },
  // 搜索结果
  {
    path: '/searchResult/:key',
    component: SearchResult
  },
  // 详情
  {
    path: '/detail/:artid',
    component: Detail
  }
]

const router = new VueRouter({
  routes
})

// 将 VueRouterPush 中的 push 保存起来
const VueRouterPush = VueRouter.prototype.push
// 重新给 vuerouter 中的 push 赋值

VueRouter.prototype.push = function (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default router
