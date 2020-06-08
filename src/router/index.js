import Vue from 'vue'
import VueRouter from 'vue-router'
import Uservant from '../views/uservant/index.vue'
import Login from '../views/login/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/uservant',
    component: Uservant
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
