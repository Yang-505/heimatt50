<template>
    <div>
        <van-popup style="margin-bottom: 60px" :value="value" @input="fn" position="bottom" :style="{ height: '70%' }">
            <!-- 当前的评论 -->
            <van-cell title="当前评论"></van-cell>
            <comment :isShow="false" :item="currentComment" />
            <!-- 评论的回复 -->
            <van-cell title="评论的回复"></van-cell>
            <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
                <comment :isShow="false" :item="item" v-for="(item, index) in replyList" :key="index" />
            </van-list>
            <!-- 书写评论的组件 -->
            <write @addComment="addComment" :commid="currentComment.com_id" :isReply="true" />
        </van-popup>
    </div>
</template>

<script>
// 导入
import comment from './comment'
import write from './write'
// 导入 bus
import bus from '../../../utils/bus'
// 导入评论的回复
import { apiGetCommentReply } from '../../../api/comment'
export default {
  props: ['value'],
  data () {
    return {
      loading: false,
      finished: false,
      // 当前评论
      currentComment: {},
      // 分页的标识
      offset: null,
      // 结束标识
      endid: 0,
      // 页容量
      limit: 10,
      // 回复列表
      replyList: []
    }
  },
  methods: {
    fn (abc) {
      this.$emit('input', abc)
    },

    async onLoad () {
      // 请求服务器
      const res = await apiGetCommentReply({
        commid: this.currentComment.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })
      this.replyList = [...this.replyList, ...res.data.data.results]
      this.offset = res.data.data.last_id
      this.endid = res.data.data.end_id
      // 关闭加载状态
      this.loading = false
      // 判断数据源是否加载完毕
      if (this.offset === this.endid) {
        this.finished = true
      }
    },
    // 添加文章评论的回复
    addComment (reply) {
      // 将 reply 添加到 replyList 中
      this.replyList.unshift(reply)
      // 让当前评论数据 + 1
      this.currentComment.reply_count++
    }
  },
  mounted () {
    // 监听 bus 中的事件
    bus.$on('passitem', item => {
      // 保存当前评论
      this.currentComment = item
      // console.log(this.currentComment)
      // 解决 第二次打开回复评论 只显示第一次打开的回复评论
      // 在每次打开之前 清空数据 再次获取数据
      this.loading = false
      this.finished = false
      this.offset = null
      this.endid = 0
      this.limit = 10
      this.replyList = []
    })
  },
  // 注册
  components: {
    comment,
    write
  }
}
</script>

<style>

</style>
