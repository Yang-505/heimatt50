import Vue from 'vue'
import Vuex from 'vuex'
// 导入操作 local 的方法
import { localGet } from '../utils/mylocal.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 管理状态
    // 在打开项目时应该从 localstorage 中取出来 userInfo
    userInfo: localGet('userInfo') || {}
  },
  mutations: { // 修改状态
    // 定义一个修改 userInfo 的函数
    setUserInfo (state, payload) {
      // 给 userInfo 赋值
      state.userInfo = payload
    }
  }
})
