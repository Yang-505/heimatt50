<template>
  <div class="channel">
    <van-popup :value="show" @input="myinput" position="bottom" :style="{ height: '80%' }">
      <!-- <van-popup :value="show" @input="v=>show=v" position="bottom" :style="{ height: '30%' }"> -->
      <!-- <van-popup v-model="show" position="bottom" :style="{ height: '30%' }"> -->
      <!-- 我的频道 -->
      <van-cell title="我的频道">
        <template #default>
          <van-button
            v-if="isShow===false"
            @click="isShow=true"
            round
            size="mini"
            plain
            type="danger"
          >编辑</van-button>
          <van-button v-else @click="isShow=false" round size="mini" plain type="danger">完成</van-button>
        </template>
      </van-cell>
      <van-grid>
        <van-grid-item
          @click="changChannel(index)"
          class="itemf"
          v-for="(item, index) in channelList"
          :key="index"
        >
          <template #text>
            <span class="wenzi" :class="{active:active === index}">{{item.name}}</span>
            <van-icon
              @click.stop="delChannel(item, index)"
              v-show="isShow && index !==0"
              class="items"
              size="12"
              name="clear"
            />
          </template>
        </van-grid-item>
      </van-grid>

      <!-- 频道推荐 -->
      <van-cell title="频道推荐" />
      <van-grid>
        <van-grid-item
          @click="addChannle(item)"
          v-for="(item, index) in newChannel"
          :key="index"
          :text="item.name"
        />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
// 导入操作频道的方法 // 导入修改频道的方法
import { apiGetAllChannel, apiUpdateChannel } from '@/api/channel.js'
//  localostrage 的操作
import { localSet } from '../../../utils/mylocal.js'
export default {
  // show : 控制面板的显示与隐藏
  // channelList: 我的频道数据
  // active: 当前选中的频道
  props: ['show', 'channelList', 'active'],
  data () {
    return {
      // 控制叉叉的显示和隐藏
      isShow: false,
      // 所有频道的数据
      allChannel: []
    }
  },
  methods: {
    // 将来点击遮罩层会触发这个方法：在方法有一个参数
    myinput (v) {
      this.$parent.show = v
    },

    // 得到所有的频道数据
    async getAllChannel () {
      const res = await apiGetAllChannel()
      //   this.allChannel = res
      //   console.log(res)
      this.allChannel = res.data.data.channels
    },
    // 添加频道
    async addChannle (item) {
      // // 1 将当前点击的频道数据添加到我的频道中
      // this.channelList.push(item)
      // // 2 将修改之后的频道数据进行保存
      // const token = this.$store.state.userInfo.token
      // // 判断用户是否登录
      // // console.log(token)
      // if (!token) {
      //   // 2.1 如果未登录: 直接将频道数据保存到本地的 localsorage 中
      //   localSet('channelList', this.channelList)
      // } else {
      //   // 2.2 如果已登录, 直接将频道数据保存到本地的 localstorage 中
      //   // 生成新的频道列表
      //   // seq: 序号默认是从1开始的
      //   // 由于 id = 0 对应的是推荐，所以这个数据不应该被操作
      //   var channel = this.channelList.slice(1).map((item, index) => {
      //     return {
      //       id: item.id,
      //       seq: index + 2
      //     }
      //   })
      //   console.log(channel)
      //   // 发送请求到服务器,去修改当前登录用户的频道数据
      //   await apiUpdateChannel(channel)
      //   // this.$set()
      // }

      // 添加格外属性
      this.$set(item, 'articleList', [])
      this.$set(item, 'isLoading', false)
      this.$set(item, 'loading', false)
      this.$set(item, 'finished', false)
      // 1 将当前点击的频道数据添加到我的频道中
      this.channelList.push(item)
      // 2 将修改之后的频道数据进行保存
      this.saveChannel()
    },

    // 删除我的频道
    delChannel (item, index) {
      // 1. 将 index 对应的数据从我的频道中删除
      this.channelList.splice(index, 1)
      // 2 保存数据
      this.saveChannel()
    },
    // 封装保存频道的方法
    async saveChannel () {
      // 判断用户是否登录
      const token = this.$store.state.userInfo.token
      // console.log(token)
      // 判断用户是否登录
      if (!token) {
        // 未登录: 保存到 localostorage 中
        localSet('channelList', this.channelList)
      } else {
        // 提交到服务器
        var channel = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        await apiUpdateChannel(channel)
      }
    },

    // 高亮选中频道
    changChannel (index) {
      // console.log(index)
      // this.$parent.active = index
      this.$emit('update:active', index)
    }
  },

  // 计算属性钩子函数
  computed: {
    // 推荐频道
    newChannel () {
      // 1. 得到我的频道数据中所有的元素的 id 元素
      const ids = this.channelList.map(item => {
        return item.id
      })
      // 2. 遍历所有的频道数据, 判断元素的ID在ids中是否存在,
      const newArr = this.allChannel.filter(item => {
        return !ids.includes(item.id)
      })
      return newArr
    }
  },

  mounted () {
    // 1. 得到全部的频道数据
    this.getAllChannel()
  }
}
</script>

<style lang="less" scoped>
.channel {
  .itemf {
    position: relative;
    .items {
      position: absolute;
      top: 0px;
      right: 0px;
    }
    .wenzi {
      color: #646566;
      font-size: 12px;
    }
    .active {
      color: red;
    }
  }
}
</style>
