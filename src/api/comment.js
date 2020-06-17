// 導入 myhttp
import myhttp from '../utils/myhttp'

// 來封裝所有與評論或者評論的回復
export function apiGetComment ({ artid, offset, limit }) {
  return myhttp({
    url: '/app/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: artid,
      offset: offset,
      limit: limit
    }
  })
}

// 封装:添加文章的 评论或评论回复
export function apiAddComment ({ artid, content }) {
  return myhttp({
    url: '/app/v1_0/comments',
    method: 'POST',
    data: {
      target: artid,
      content: content
    }
  })
}
