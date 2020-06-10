// 封装 axios
// 1 导入axios
import axios from 'axios'

// 2 创建一个axios实例
const http = axios.create({
  // 设置一个基地址
  baseURL: 'http://ttapi.research.itcast.cn'
  // xsrfCookieName:  这是千万不要添加这个属性，否则会报跨域的错误（因为之前黑马面面中的服务器需要在请求中携带 cookie，但是黑马头条不需要）
})

// 3 给axios 添加拦截器
// 请求拦截器
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

// 4.0 将 http 暴露给外界
export default http
