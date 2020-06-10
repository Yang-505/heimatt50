<template>
  <div class="index">
    <!-- 头部标题 -->
    <van-nav-bar :fixed="true" class="mytitle" title="主页" />
    <!-- 频道区域 -->
    <van-tabs>
      <van-tab v-for="index in 8" :key="index" :title="'标签 ' + index">
        <!-- 下拉刷新 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- 完成上拉加载更多 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 操作按钮 -->
    <div class="process">
      <van-icon name="bars" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // list 组件的加载状态
      loading: false,
      // 判断 list 组件中的数据是否加载完毕
      finished: false,
      // cell 的数据源
      list: [],
      // 下拉刷新组件的刷新状态
      isLoading: false
    }
  },
  methods: {
    // 当 list 组件滚动到底部,会触发这个事件
    onLoad () {
      console.log('onload')
      // 会在 list 触底时加载：添加 15 条数据
      var arr = [1, 2, 3, 4, 5, 6, 7, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      // 将这 20 条数据加载到 list 中
      this.list = [...this.list, ...arr] // 将 list 与 arr 进行合并
      // 将 loading 重置为 false
      this.loading = false
      // 判断长度，如果达到 100，就停止
      if (this.list.length >= 100) {
        // 停止加载
        this.finished = true
      }
      console.log(this.list.length)
    },
    onRefresh () {
      console.log('refresh')
      setTimeout(() => {
        // 将 list 中的数据清空
        this.list = []
        // 将 list 的 finished 设置为 false
        this.finished = false
        this.isLoading = false
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  margin-top: 90px;
  margin-bottom: 50px;
  .mytitle {
    background-color: #3e9df8;
    /deep/ .van-nav-bar__title {
      color: #fff;
    }
  }
   /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0px;
    width: 90%;
    z-index: 999;
  }
   .process {
    position: fixed;
    top: 46px;
    right: 0px;
    z-index: 1000;
    width: 10%;
    height: 44px;
    background-color: pink;
    text-align: center;
    line-height: 44px;
    font-size: 20px;
  }
}
</style>
