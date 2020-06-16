<template>
  <div class="result">
    <!-- 完成标题 -->
    <van-nav-bar @click-left="onClickLeft" left-arrow :fixed="true" class="mytitle" title="搜索结果" />
    {{key}}
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="(item, index) in resultList" :key="index">
        <van-cell>
          <template #title>
            <!-- 标题 -->
            <h4>{{item.title}}</h4>
            <!-- 图片 -->
            <van-grid :border="false" :column-num="3" v-if="item.cover.type !==0">
              <van-grid-item v-for="(itemsub, indexsub) in item.cover.images" :key="indexsub">
                <van-image lazy-load :src="itemsub" />
              </van-grid-item>
            </van-grid>
            <!-- 其它信息 -->
            <div class="msgbox">
              <div class="left">
                <span>{{item.aut_name}}</span>
                <span>{{item.comm_count}}</span>
                <span>{{item.pubdate | timefilter }}</span>
              </div>
            </div>
          </template>
        </van-cell>
        <van-grid direction="horizontal" :column-num="3">
          <van-grid-item icon="comment-o" @click="commet()" text="62" />
          <van-grid-item icon="like-o" @click="zan()" text="点赞" />
          <van-grid-item icon="exchange" text="分享" />
        </van-grid>
      </div>
    </van-list>
  </div>
</template>

<script>
// 导入
import { apiGetArticle } from '../../api/utils'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      // 接收传过来的值
      key: '',
      // 页数
      page: 1,
      perpage: 10,
      // 保存数据
      resultList: []
    }
  },
  // 方法
  methods: {
    // 返回到上一个页面
    onClickLeft () {
      this.$router.back() // 回到上一个路由中
    },
    async onLoad () {
      const res = await apiGetArticle({
        page: this.page,
        perpage: this.perpage,
        q: this.key
      })
      this.resultList = [...this.resultList, ...res.data.data.results]
      // 将list 的加载状态设置为 false
      this.loading = false
      // 将文件 list 的 加载状态进行 page++
      this.page++
      // 判断数据源全部加载完毕, 应该将 ifnisehd true
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
    },
    // 评论按钮
    commet () {
      // 1. 判断用户是否登录
      const token = this.$store.state.userInfo.token
      if (token) {
        console.log('已经登录,处理逻辑')
      } else {
        this.$router.push('/login')
        this.$toast.fail('请登录')
      }
    },
    // 点赞
    zan () {
      // 已登录会返回true,未登录会返回 false
      if (!this.$login()) {
        return // 中断后续代码的执行
      }
      console.log('点赞功能')
    }
  },
  // 钩子函数
  created () {
    this.key = this.$route.params.key
  }
}
</script>

<style lang="less" scoped>
.result {
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
  .msgbox {
    span {
      margin-right: 10px;
    }
  }
}
</style>
