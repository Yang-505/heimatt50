<template>
  <div class="more">
      <van-popup class="morepop" v-model="show">
        <van-cell-group>
            <van-cell @click="dislike()" icon="failure" title="不感兴趣"></van-cell>
            <van-cell icon="warn-o" class="mycell" is-link title="反馈垃圾内容"></van-cell>
            <van-cell icon="delete" title="拉黑作者"></van-cell>
        </van-cell-group>
        {{ artid }}
      </van-popup>
  </div>
</template>

<script>
// 导入操作文章的接口 apiDisList
import { apiDisList } from '../../../api/article'
export default {
  // artid: 当前点击的文章 id
  props: ['artid'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    // 点击不感兴趣
    async dislike () {
      // 判断用户是否登录
      const token = this.$store.state.userInfo.token
      if (token) {
        // 1. 将当前文章数据从页面上删除
        // 1.1 将当前文章数据传回父组件
        this.$emit('delArt', this.artid)
        // 2 将当前文章数据提交到服务器,将数据标记为不感兴趣
        const res = await apiDisList(this.artid)
        console.log(res)
      } else {
        // 错误
        this.$toast('对不起,只有登录之后才能进行操作')
      }
      // 关闭面板
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.more{
    .morepop{
        width: 90%;
        border-radius: 5px;
        .mycell{
            border-top: 1px solid #cecece;
            border-bottom: 1px solid #cecece;
        }
    }
}
</style>
