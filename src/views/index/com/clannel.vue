<template>
    <div class="channel">
        <van-popup :value="show" @input="myinput" position="bottom" :style="{ height: '80%' }">
        <!-- <van-popup :value="show" @input="v=>show=v" position="bottom" :style="{ height: '30%' }"> -->
        <!-- <van-popup v-model="show" position="bottom" :style="{ height: '30%' }"> -->
            <!-- 我的频道 -->
            <van-cell title="我的频道">
                <template #default>
                    <van-button v-if="isShow===false" @click="isShow=true" round size="mini" plain type="danger">编辑</van-button>
                    <van-button v-else @click="isShow=false" round size="mini" plain type="danger">完成</van-button>
                </template>
            </van-cell>
            <van-grid>
                <van-grid-item class="itemf" v-for="(item, index) in channelList" :key="index">
                    <template #text>
                        <span class="wenzi">{{item.name}}</span><van-icon v-show="isShow" class="items" size="12" name="clear" />
                    </template>
                </van-grid-item>
            </van-grid>
            <!-- 频道推荐 -->
            <van-cell title="频道推荐" />
            <van-grid>
                <van-grid-item v-for="(item, index) in newChannel" :key="index" :text="item.name" />
            </van-grid>
        </van-popup>
    </div>
</template>

<script>
// 导入操作频道的方法
import { apiGetAllChannel } from '@/api/channel.js'
export default {
  props: ['show', 'channelList'],
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
    }
  },
  computed: {
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
            color:#646566;
            font-size: 12px;
        }
    }
}
</style>
