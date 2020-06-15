// 封装其他的接口
import myhttp from '../utils/myhttp'

// 封装方法: 联想 获取联想建议
export function apiThink (key) {
  return myhttp({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q: key
    }
  })
}
