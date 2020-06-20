// 封装 axios
// 1 导入axios
import axios from 'axios'
// 导入 store
import store from '../store/index'
// 导入 json-bigint
import JSONBig from 'json-bigint'
import { localSet } from './mylocal.js'
// 2 创建一个axios实例
const http = axios.create({
  // 设置一个基地址
  baseURL: 'http://ttapi.research.itcast.cn',
  // axrfCookieName: 这个千万不要添加这个属性.否则会报跨域的错误(之前黑马面面中的服务器响应在请求中携带cookie,但是黑马头条不需要)
  // 允许我们在处理返回数据之前,操作返回的数据
  // 响应预处理函数
  transformResponse: [function (data) {
    try {
      // data: 从服务器返回回来的 json 格式的
      return JSONBig.parse(data)
    } catch (error) {
      return JSON.parse(data)
    }
  }]
})
// 3. 创建一个拦截器地址
const http1 = axios.create({
  // 设置一个基地址
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 3. 给axios 添加拦截器
// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (store.state.userInfo.token) {
    //  如果存在 将token 添加到请求中
    config.headers.Authorization = `Bearer ${store.state.userInfo.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  console.log('-----------------响应拦截器---------------------')
  // console.log('状态码为:' + error.response.status)
  // console.dir(error)
  // 判断当前请求的错误信息是否是401, 如果是401 说明 token 过期了
  if (error.response.status === 401) {
    // 说明token 过期了
    // const refreshToken = store.state.userInfo.token// 得到 refreshToken token
    // console.log(store.state)
    const refreshToken = store.state.userInfo.refresh_token // 得到 refresh_token
    console.log(refreshToken)
    // console.log('我获取到了新的token')
    // 将 refresh_token 提交到服务器, 得到新的 token
    const tokenRes = await http1({
      url: '/app/v1_0/authorizations',
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    })
    const newToken = tokenRes.data.data.token // 得到新的 token
    console.log(newToken)
    // // 得到新的 userInfo 对象
    const userInfo = {
      token: newToken,
      refresh_token: refreshToken
    }
    // // 过期的 token 存在哪里, 1，store 2 localStorage 中
    store.commit('setUserInfo', userInfo) // 覆盖掉 store 中的过期 token
    localSet('userInfo', userInfo) // 覆盖掉 本地的 token
    // 使用 新的 token 完成未完成的请求
    return http(error.config)
  }
  console.log('------------------响应拦截器----------------')
  return Promise.reject(error)
})

// 4 将 http 暴露给外界
export default http

// 说明: error 对象中关键的三个属性
// config: 本次发送请求的配置
//        baseURL
//        url
//        headers
//        ......
//        request: 本次请求服务器的相关信息
//        response:本次请求服务器响应的信息
//        status: 401 // 响应的状态码
