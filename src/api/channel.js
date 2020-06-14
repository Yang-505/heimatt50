// 导入 myhhtp
import myhttp from '@/utils/myhttp.js'

// 封装所有与频道相关的网络请求
export function apiGetChannel () {
  return myhttp({
    url: '/app/v1_0/user/channels'
  })
}

// 封装一个得到所有频道的方法
export function apiGetAllChannel () {
  return myhttp({
    url: '/app/v1_0/channels'
  })
}

// 封装一个修改频道的方法
export function apiUpdateChannel (channels) {
  return myhttp({
    url: '/app/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: channels
    }
  })
}
