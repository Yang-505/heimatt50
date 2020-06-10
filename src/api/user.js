// 用来处理所有与用户相关的网络请求
// 1.0 导入自己封装好的 axios（默认导入： import xx from 'xxxx'）
import myhttp from '../utils/myhttp.js'
// 2.0 封装登录的请求
export function apiLogin ({ mobile, code }) {
  return myhttp({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile: mobile,
      code: code
    }
  })
}

// export {
//   apiLogin
// }
