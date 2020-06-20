<template>
  <div class="write">
      <!-- 输入任意文本 -->
    <van-field
        v-model="value"
        center
        clearable
        placeholder="写评论"
        >
     <template #button>
        <van-button @click="sendMsg" size="small" type="primary">发送</van-button>
     </template>
    </van-field>
</div>
</template>

<script>
import { apiAddCommentReply, apiAddComment } from '../../../api/comment'
// 导入封装添加文章的评论或者回复
export default {
  props: ['isReply', 'commid'],
  data () {
    return {
      value: ''
    }
  },
  methods: {

    // 发送评论到服务器
    async sendMsg () {
      if (this.isReply === true) {
        // console.log(this.isReply)
        // 将数据提交到服务器
        const res = await apiAddCommentReply({
          commid: this.commid.toString(),
          content: this.value,
          artid: this.$route.params.artid
        })
        // 得到返回的新增的对象
        var newCommentObj = res.data.data.new_obj
        // 将对象传给 reply 父组件
        this.$emit('addComment', newCommentObj)
        // 清空输入框
        this.value = ''
      } else {
        const res = await apiAddComment({
          artid: this.$route.params.artid,
          content: this.value
        })
        console.log(res)
        // 接收返回的评论数据
        const newComment = res.data.data.new_obj
        // 将数据从 write 组件中传给 detail
        this.$emit('addComment', newComment)
        // 清除输入框中的内容
        this.value = ''
      }
    }

  }
}
</script>

<style lang='less' scoped>
.write{
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
     /deep/ .van-field__control {
        border: 1px solid #ccc;
        height: 40px;
        border-radius: 30px;
        padding-left: 10px;
    }
}

</style>
