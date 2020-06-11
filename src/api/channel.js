// 导入 myhhtp
import myttp from '@/utils/myhttp.js'

// 封装所有与频道相关的网络请求
export function apiGetChannel () {
  return myttp({
    url: '/app/v1_0/user/channels'
  })
}

// 封装一个得到所有频道的方法
export function apiGetAllChannel () {
  return myttp({
    url: '/app/v1_0/channels'
  })
}
