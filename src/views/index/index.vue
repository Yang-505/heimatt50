<template>
  <div class="index">
    <!-- 头部标题 -->
    <van-nav-bar :fixed="true" class="mytitle" title="主页" />
    <!-- 频道区域 -->
    <van-tabs v-model="active">
      <van-tab  v-for="(item, index) in channelList" :key="index" :title="item.name">
       <!-- 下拉刷新 -->
       <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
        <!-- 完成上拉加载更多 -->
          <van-list
              v-model="item.loading"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="onLoad">
            {{ active }}
            <van-cell class="mycell" v-for="(subitem, subindex) in item.articleList" :key="subindex" :title="subitem.title">
              <!-- 标题 -->
              <template #title>
                <h4  @click="$router.push('/detail/' + subitem.art_id)">{{subitem.title}}</h4>
              <!-- 图片 -->
              <van-grid v-if="subitem.cover.type !==0" :border="false" :column-num="3">
                <van-grid-item v-for="(imgitem,imgindex) in subitem.cover.images" :key="imgindex">
                  <!-- 懒加载 -->
                  <van-image error lazy-load :src="imgitem" />
                </van-grid-item>
              </van-grid>
              <!-- 其他信息 -->
              <div class="msgbox">
                <div class="left">
                  <span>{{ subitem.aut_name }}</span>
                  <span>{{ subitem.comm_count }}评论</span>
                  <span>{{ subitem.pubdate | timefilter}}</span>
                </div>
                <div class="right">
                  <van-icon @click="openMore(subitem)" name="cross" />
                </div>
              </div>
              </template>
            </van-cell>
          </van-list>
       </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 操作按钮 -->
    <div class="process" @click="showChannel()">
      <van-icon name="bars" />
    </div>
    <!-- 弹出层子组件 -->
    <!-- <clannel :show="show" @update:active="v=>active=v" :active="active" :channelList="channelList"/> -->
      <clannel :show="show"  :active.sync="active" :channelList="channelList"/>
    <!-- 更多面板 -->
    <more ref="more" @delArt="delArt" :artid="artid" :autid="autid" />
  </div>
</template>

<script>
// 导入操作频道的方法
import { apiGetChannel } from '../../api/channel.js'
// 导入操作 local 的方法
import { localGet } from '../../utils/mylocal.js'
// 导入操作文章的方法
import { apiGetArticleList } from '../../api/article.js'
// 导入 子组件
import clannel from './com/clannel.vue'
// 导入更多操作组件
import more from './com/more.vue'
export default {
  // 注册
  components: {
    clannel,
    more
  },
  data () {
    return {
      // 频道列表
      channelList: [],
      // 选中的 tab 的下标
      active: 0,
      // 控制弹出层
      show: false,
      // 记录当前点击数据的 id
      artid: 0,
      // 记录当前数据的作者id
      autid: 0
    }
  },
  methods: {
    // 当 list 组件滚动到底部时，会触发这个事件
    async onLoad () {
      // 1.0 得到当前选中的频道
      const currentChannel = this.channelList[this.active]
      // 2.0 得到当前有切换的频道的 id
      const id = currentChannel.id
      // 3.0 发送请求到服务器中，得到对应的文章数据
      const res = await apiGetArticleList(id)
      // 4.0 将文章数据保存到当前选中的频道中
      currentChannel.articleList = [...currentChannel.articleList, ...res.data.data.results]
      // 5. 将 list 列表的状态的频道中cu
      // console.log(currentChannel)
      currentChannel.loading = false
      // 判断服务器返回的文章加载状态码改为false
      // 6. 判断服务器返回的文章数据长度,如果长度为0, 我们就应该将list 组件的数据状态长度0
      if (res.data.data.results.length === 0) {
        currentChannel.finished = true
      }
    },

    // 下拉刷新
    onRefresh () {
      // console.log('refresh')
      // 得到当前有频道
      const currentChannel = this.channelList[this.active]
      // 清除当前频道下的所有数据
      currentChannel.articleList = []
      currentChannel.loading = false
      currentChannel.isLoading = false
      currentChannel.finished = false
      // 重新加载数据
      this.onLoad()
    },
    // 得到频道数据
    async getChannel () {
      try {
        // 得到用户的登录信息
        const token = this.$store.state.userInfo.token
        // 判断用户是否登录：
        if (token) {
          // 1.0 如果登录：直接从服务器中得到当前用户的频道数据
          const res = await apiGetChannel()
          console.log(res)
          console.log(1111)
          this.channelList = res.data.data.channels
        } else {
          // 2.0 如果没有登录：
          // 得到 localstorage
          const mylist = localGet('channelList')
          if (mylist) {
            //   2.1 判断 localstorage: 如果存在数据，就直接将数据取出进行渲染
            this.channelList = mylist
          } else {
            //   2.2 判断 localstorage：如果不存在数据，就直接从服务器中得到
            const res = await apiGetChannel()
            this.channelList = res.data.data.channels
          }
        }
      } catch (err) {
        console.log('哎呀，出错啦！')
        // 用户过期跳转到登录页面
        this.$toast.fail('账号过期自动跳转到登录页面')
        this.$router.push('/login')
      }
      // 添加额外属性
      this.addOtherPropToList()
    },

    // 额外属性
    addOtherPropToList () {
      // 遍历频道列表，
      this.channelList.forEach(item => {
        // 添加额外的文章数据
        // item.articleList = []
        this.$set(item, 'articleList', [])
        // 添加额外的上拉加载更多的状态属性
        // item.loading = false
        this.$set(item, 'loading', false)
        // 添加额外的下拉刷新属性
        // item.isLoading = false
        this.$set(item, 'isLoading', false)
        // 添加 list 的完结状态
        // item.finished = false
        this.$set(item, 'finished', false)
      })
      console.log(this.channelList)
    },

    // 弹出层
    showChannel () {
      this.show = true
    },

    // 打开更多面板
    openMore (item) {
      this.$refs.more.show = true
      // 记录文章的 id
      this.artid = item.art_id
      // 记录作者 id
      this.autid = item.aut_id
      console.log(item)
    },

    // 删除不感兴趣的文章
    delArt (artid) {
      console.log(artid)
      // 得到当前选中的频道数据
      const currentChannel = this.channelList[this.active]
      // 遍历并删除
      currentChannel.articleList.forEach((item, index) => {
        // 判断 item 的 id 与 artid 是否相同
        if (item.art_id === artid) {
          // 将文章数据删除
          currentChannel.articleList.splice(index, 1)
        }
      })
    }
  },

  mounted () {
    // 请求服务器的频道接口，保存数据，渲染数据
    this.getChannel()
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
    right: 0px;
    top: 46px;
    z-index: 1000;
    width: 10%;
    height: 44px;
    text-align: center;
    line-height: 44px;
    font-size: 30px;
  }
  .mycell{
    height: 100%;
  }
  .msgbox {
    display: flex;
    // justify-content: space-between;
    // justify-content: space-between;
    justify-content: space-between;
    .left {
      color: #999;
      span {
        margin-right: 10px;
      }
    }
    .right {
      border: 1px solid #ccc;
      width: 24px;
      height: 15px;
      text-align: center;
      line-height: 15px;
    }
  }
}
</style>
