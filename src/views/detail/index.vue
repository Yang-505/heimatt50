<template>
    <div class="detail">
        <!-- 头部标题 -->
        <van-nav-bar @click-left="$router.back()" left-arrow :fixed="true" class="mytitle" title="文章详情" />
        <!-- 文章标题 -->
        <h1>{{ detail.title }}</h1>
        <!-- 作者信息 -->
        <van-cell>
            <template #title>
                <div class="auth">
                    <div class="authImg">
                        <img :src="detail.aut_photo" alt="">
                    </div>
                    <div class="authMsg">
                        <div class="authName">{{ detail.aut_name }}</div>
                        <div class="authTime">{{ detail.pubdate | timefilter }}</div>
                    </div>
                    <div class="follow">
                        <van-button @click="follow" v-if="detail.is_followed === false" type="info"><van-icon name="plus" />关注</van-button>
                        <van-button @click="unfollow" v-else type="info">已关注</van-button>
                    </div>
                </div>
            </template>
        </van-cell>
        <!-- 文章区域 -->
        <van-cell>
            <template #title>
                <div v-html="detail.content"></div>
            </template>
        </van-cell>
        <!-- 点赞 & 不喜欢 -->
        <div class="btnbox">
            <div class="item">
                <van-button @click="zan" v-if="detail.attitude === 1" round type="danger" plain><van-icon name="like"></van-icon>点赞</van-button>
                <van-button @click="Unzan" v-if="detail.attitude !== 1" round type="default" plain><van-icon name="like"></van-icon>点赞</van-button>
            </div>
            <div class="item">
                <van-button @click="dislick" v-if="detail.attitude === 0" round type="danger" plain><van-icon name="delete"></van-icon>不喜欢</van-button>
                <van-button @click="lick" v-if="detail.attitude !== 0" round type="default" plain><van-icon name="delete"></van-icon>不喜欢</van-button>
            </div>
        </div>
        <!-- 评论区域 -->
        <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
            <!-- 使用 -->
            <comment  :item="item" v-for="(item, index) in commentList" :key="index" />
        </van-list>
        <!-- 评论 -->
        <write :isReply="false" @addComment="addComment" />
        <!-- 回复组件 -->
        <reply v-model="replyShow" />
    </div>
</template>

<script>
// 导入评论子组件
import comment from './com/comment'
// 导入底部评论子组件
import write from './com/write'
// 导入子组件回复面板
import reply from './com/reply'
// 导入 关注 & 取关作者的方法
import { apiFollow, apiUnFollow } from '../../api/user'
// 导入操作文章的方法 & 文章點讚 & 取消文章點讚
import { apiGetDetail, apiZan, apiUnZan, apiNoList, apiDisList } from '../../api/article'
// 导入所有评论或者回复评论的数据方法
import { apiGetComment } from '../../api/comment'
export default {
  // 注册
  components: {
    comment,
    write,
    reply
  },
  data () {
    return {
      finished: false,
      loading: false,
      // 文章详细
      detail: {},
      // 文章的id
      artid: 0,
      offset: null,
      endid: 0,
      // 页容量
      limit: 10,
      commentList: [],
      // 控制 reply 面板的显示和隐藏
      replyShow: false
    }
  },
  methods: {
    // 添加评论
    addComment (newComment) {
      // console.log('')
      // 将新的添加到 detail 中的 commentList中
      this.commentList.unshift(newComment)
    },
    async onLoad () {
      // 根據文章的 id 得到評論的數據
      const res = await apiGetComment({
        artid: this.artid,
        offset: this.offset,
        limit: this.limit
      })
      console.log(res)
      this.offset = res.data.data.last_id
      this.endid = res.data.data.end_id
      this.commentList = [...this.commentList, ...res.data.data.results]
      // 将 loading 设置为false
      this.loading = false
      // 判断数据是否加载完成
      if (this.offset === this.endid) {
        this.finished = true
      }
    },
    // 发送请求到服务器得到文章数据
    async getDetail () {
      const res = await apiGetDetail(this.artid)
      // 保存数据
      this.detail = res.data.data
      console.log(this.detail)
    },
    // 关注作者
    async follow () {
      // 判断用户是否登录
      if (!this.$login()) {
        return
      }
      // 将作者 id 提交到服务器
      await apiFollow(this.detail.aut_id)
      // 手动将关注设置为 true
      this.detail.is_followed = true
    },
    // 取关作者
    async unfollow () {
      if (!this.$login()) {
        return
      }
      // 手动将关注状态设置为 false
      this.detail.is_followed = false
      // 取关作者
      await apiUnFollow(this.detail.aut_id)
    },
    // 取消點讚
    async zan () {
      // 將文章 id 提交到服務器中
      // console.log('我取消了点赞')
      await apiZan(this.detail.art_id)
      // console.log(this.detail.art_id)
      // 手動將狀態改為 點讚
      this.detail.attitude = -1 // -1 為無狀態 0 不喜歡 1 點讚
    },
    // 點讚
    async Unzan () {
      // console.log('我点击了点赞')
      // 手動將狀態改為 取消點讚
      this.detail.attitude = 1 // -1 為無狀態 0 不喜欢  1 點讚
      // 將文章 id 提交到服務器中
      await apiUnZan(this.detail.art_id)
      // console.log(this.detail.art_id)
    },
    // 点击不喜歡
    async lick () {
      // console.log('我点击了点击不喜歡')
      this.detail.attitude = 0
      await apiNoList(this.detail.art_id)
    },
    // 取消不喜歡
    async dislick () {
      // console.log('我点击了取消不喜歡')
      this.detail.attitude = -1
      await apiDisList(this.detail.art_id)
    }
  },
  mounted () {
    // 在打开页面时得到文章 id
    this.artid = this.$route.params.artid
    // 调用得到详细的方法
    this.getDetail()
  }

}
</script>

<style lang="less" scoped>
.detail {
    margin-top: 46px;
    .mytitle {
        background-color: #3e9df8;
        /deep/ .van-nav-bar__title {
            color: #fff;
        }
        /deep/ .van-nav-bar__arrow {
            color: #fff;
        }
    }
    h1 {
        text-align: center;
        font-weight: 400;
        padding: 20px;
    }
    .auth {
        display: flex;
        .authImg {
            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        }
        .authMsg {
            margin-left: 10px;
            flex: 1;
        }
    }
    .btnbox {
        margin: 30px 0px;
        display: flex;
        .item {
            flex: 1;
            text-align: center;
        }
    }
}
</style>
