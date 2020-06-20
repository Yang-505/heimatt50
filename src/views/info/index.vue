<template>
  <div class="info">
    <!-- 头部标题 -->
    <van-nav-bar @click-left="$router.back()" left-arrow @click-right="save" right-text="保存" :fixed="true" class="mytitle" title="个人信息" />
    <!-- 头像 & 昵称 & 介绍 -->
    <van-cell-group>
      <van-cell @click="openFile" title="头像" is-link>
        <template #default>
          <img class="avatar" :src="info.photo" alt="">
        </template>
      </van-cell>
      <van-cell @click="openNick" title="昵称" is-link :value="info.name" />
      <van-cell title="介绍" is-link :value="info.intro" />
    </van-cell-group>
    <!-- 性别 & 生日 -->
    <van-cell-group>
      <van-cell title="性别" :value="info.gender ? '女': '男'" />
      <van-cell title="生日" :value="info.birthday" />
    </van-cell-group>
    <!-- 添加一个昵称的面板 -->
    <van-popup v-model="isShow" position="bottom" :style="{ height: '8%' }">
      <van-field v-model="info.name" required />
    </van-popup>
    <!-- 头像上传面板 -->
    <Filepop ref="filepop" />
  </div>
</template>

<script>
// 导入子组件
import Filepop from './com/filepop'
// 导入方法
import { apiGetInfoOne, apiGetInfoTwo, apiUpdateInfo } from '../../api/user'
export default {
  // 注册
  components: {
    Filepop
  },
  data () {
    return {
      info: {},
      // 控制昵称面板的显示和隐藏
      isShow: false
    }
  },
  methods: {
    async save () {
      try {
        await apiUpdateInfo({
          name: this.info.name,
          gender: this.info.gender,
          birthday: this.info.birthday,
          intro: this.info.intro
        })
        // 提示用户修改成功
        this.$toast.success('修改成功')
      } catch (error) {
        // 提示用户修改失败
        this.$toast.file('修改失败')
      }
    },
    // 得到用户的头像 & 昵称 & 介绍
    async getInfoOne () {
      const res = await apiGetInfoOne()
      console.log(res)
      // 将用户信息保存起来
      this.$set(this.info, 'photo', res.data.data.photo)
      this.$set(this.info, 'name', res.data.data.name)
      this.$set(this.info, 'intro', res.data.data.intro)
    },
    // 得到用户的性别 & 生日
    async getInfoTwo () {
      const res = await apiGetInfoTwo()
      console.log(res)
      this.$set(this.info, 'gender', res.data.data.gender)
      this.$set(this.info, 'birthday', res.data.data.birthday)
    },
    // 打开修改 name 的面板
    openNick () {
      this.isShow = true
    },
    // 打开头像上传面板
    openFile () {
      this.$refs.filepop.show = true
    }
  },
  mounted () {
    // 得到用户信息
    this.getInfoOne()
    this.getInfoTwo()
  }
}
</script>

<style lang="less" scoped>
.info {
    margin-top: 46px;
    .mytitle {
        background-color: #3e9df8;
        /deep/ .van-nav-bar__title,
        /deep/ .van-nav-bar__arrow,
        /deep/ .van-nav-bar__text {
            color: #fff;
        }
    }
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
}
</style>
