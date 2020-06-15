<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/index" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/search" icon="comment-o">搜索</van-tabbar-item>
      <van-tabbar-item icon="tv-o">视频</van-tabbar-item>
      <van-tabbar-item to="/my" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
