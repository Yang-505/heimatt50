<template>
  <div>
    <!-- 头部搜索框 -->
    <van-search @input="think"  show-action @search="onSearch" @cancel="onCancel" v-model="value" background="#3296fa"></van-search>
    <!-- 联想区域 -->
    <van-cell-group v-if="thinkResult.length !==0">
       <van-cell title="联想区域"/>
      <van-cell icon="search" @click="onSearch(item.item)" v-for="(item, index) in thinkResult" :key="index">
        <template #title>
          <span v-html="item.newItem"></span>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 搜索历史区域 -->
    <van-cell-group v-else>
      <van-cell title="历史区域">
        <template #default>
          <van-icon @click="delArr()" name="delete"></van-icon>
        </template>
      </van-cell>
      <van-cell @click="onSearch(item)" v-for="(item, index) in historyList" :key="index" icon="search" :title="item" >
        <template #default>
          <van-icon name="cross"></van-icon>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// 导入联想方法
import { apiThink } from '../../api/utils'
// 导入储存数据, 获取数据
import { localSet, localGet, removeLoacl } from '../../utils/mylocal'
export default {
  data () {
    return {
      // 输入框中的内容
      value: '',
      // 搜索结果
      thinkResult: [],
      // 防止防抖
      timer: null,
      // 搜索历史数据
      historyList: localGet('history') || []
    }
  },
  methods: {
    // 当前点击回车 (完成)时会触发的方法
    onSearch (key) {
    // console.log('onSearch')
    // 跳转到搜索结果页面,并携带输入框中参数
      this.$router.push(`/searchResult/${key}`)
      // 将当前搜索的数据保存到 historyList 中
      this.historyList.push(key)
      // 将数据保存到本地
      localSet('history', this.historyList)
    },
    // 历史搜索
    historySearch (key) {
      this.$router.push(`/searchResult/${key}`)
      this.historyList.unshift(key)
      localSet('history', this.historyList)
      // 数组的去重
      this.historyList = [...new Set(this.historyList)]
    },
    // 点击取消时触发
    onCancel () {
      console.log('onCancel')
    },
    // 联想方法 && 防抖
    think () {
      // 清除定时器
      clearTimeout(this.timer)
      if (this.value.trim().length === 0) {
        // 将联想的结果清除
        this.thinkResult = []
        // 不再发送请求
        return
      }
      this.timer = setTimeout(async () => {
        // 1. 得到输入框的内容
        // 2 将输入框中的提交到服务器,然后接收返回的数据
        const res = await apiThink(this.value)
        console.log(res)
        // this.thinkResult = res.data.data.options
        const oldArr = res.data.data.options
        // 遍历竖中指换d 的关键字
        this.thinkResult = oldArr.map(item => {
          return {
            item: item,
            newItem: item.replace(this.value, '<span style="color: red">' + this.value + '</span>')
          }
        })
        console.log(this.thinkResult)
      }, 300)
    },
    // 清除历史记录
    delArr () {
      // 询问用户是否删除所有历史数据
      this.$dialog.confirm({
        title: '提示',
        message: '是否删除所有历史数据'
      }).then(() => {
      // 清除搜索历史
        this.historyList = []
        removeLoacl('history')
      }).catch(() => {
      // on cancel
        console.log('取消')
      })
    }
  }
  // 删除历史数据
  // del (index) {
  //   this.historyList.splice(index, 1)
  //   localSet('history', this.historyList)
  // },
}
</script>

<style lang="less" scoped>
.search {
    .van-search__action {
        color: #fff;
    }
    .van-search__action:active {
        background-color: green;
    }
}
</style>
