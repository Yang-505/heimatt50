// 封装 axios
// 1 导入axios
import axios from 'axios'
// 导入 store
import store from '../store/index.js'
// 2 创建一个axios实例
const http = axios.create({
  // 设置一个基地址
  baseURL: 'http://ttapi.research.itcast.cn'
  // axrfCookieName: 这个千万不要添加这个属性.否则会报跨域的错误(之前黑马面面中的服务器响应在请求中携带cookie,但是黑马头条不需要)
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
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

// 4 将 http 暴露给外界
export default http
