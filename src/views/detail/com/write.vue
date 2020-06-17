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
import { apiAddComment } from '../../../api/comment'
// 导入封装添加文章的评论或者回复
// import { apiAddComment } from '../../../api/comment'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    // 发送评论到服务器
    async sendMsg () {
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
