<template>
  <div class="more">
      <van-popup class="morepop" v-model="show">
        <van-cell-group v-if="isReport === false">
            <van-cell @click="dislike()" icon="failure" title="不感兴趣"></van-cell>
            <van-cell @click="isReport=true" icon="warn-o" class="mycell" is-link title="反馈垃圾内容"></van-cell>
            <van-cell icon="delete" title="拉黑作者"></van-cell>
        </van-cell-group>
        <!-- {{ artid }} -->
        <!-- 反馈垃圾信息 -->
        <van-cell-group v-else>
          <van-cell @click="isReport=false" icon="arrow-left" />
          <van-cell v-for="(item, index) in report" :key="index" :title="item.type" />
        </van-cell-group>
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
      show: false,
      // 举报类别
      report: [
        { id: 0, type: '其他问题' },
        { id: 1, type: '标题夸张' },
        { id: 2, type: '低俗色情' },
        { id: 3, type: '错别字多' },
        { id: 4, type: '旧闻重复' },
        { id: 5, type: '广告软文' },
        { id: 6, type: '内容不实' },
        { id: 7, type: '涉嫌违法犯罪' },
        { id: 8, type: '侵权' }
      ],
      // 是否显示举报详情
      isReport: false
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
