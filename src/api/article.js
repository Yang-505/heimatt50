// 封装一个得到文章列表的方法
// 导入 myhttp
import myhttp from '../utils/myhttp.js'
export function apiGetArticleList (id) {
  return myhttp({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: {
      channel_id: id, // 频道id
      timestamp: Date.now(), // 时间戳
      with_top: 0 // 包含置顶
    }
  })
}