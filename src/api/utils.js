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

// 封装方法: 得到文章数据
export function apiGetArticle ({ page, perpage, q }) {
  return myhttp({
    url: '/app/v1_0/search',
    params: {
      page: page,
      per_page: perpage,
      q: q
    }
  })
}
