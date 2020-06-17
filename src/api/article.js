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

// 封装一个对文章标记不喜欢
export function apiDisList (artid) {
  return myhttp({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: artid
    }
  })
}

// 封装一个对文章取消标记不喜欢
export function apiNoList (artid) {
  return myhttp({
    url: `/app/v1_0/article/dislikes/${artid}`,
    method: 'DELETE'
  })
}

// 举报文章
export function apiReport ({ artid, type }) {
  return myhttp({
    url: '/app/v1_0/article/reports',
    method: 'POST',
    data: {
      target: artid,
      type: type,
      remark: ''
    }
  })
}

// 封装方法; 得到文章详情
export function apiGetDetail (artid) {
  return myhttp({
    url: `/app/v1_0/articles/${artid}`,
    method: 'GET'
  })
}

// 封裝方法: 對文章點讚
export function apiZan (artid) {
  return myhttp({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artid
    }
  })
}

// 封裝方法: 對文章取消點讚
export function apiUnZan (artid) {
  return myhttp({
    url: `/app/v1_0/article/likings/${artid}`,
    method: 'DELETE'
  })
}

// 封装方法: 对文章点赞
export function apiSearchZan (artid) {
  return myhttp({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artid
    }
  })
}
