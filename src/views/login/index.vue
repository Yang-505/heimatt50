<template>
  <div class="login">
    <!-- 头部标题 -->
    <van-nav-bar class="mytitle" title="登录" />
    <!-- 手机号&验证码输入框 -->
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field left-icon="smile-o" v-model="user.phone" placeholder="手机号" :rules="[{ required: true, message: '请填写手机号' },{ pattern: /^1[345678][0-9]{9}$/, message: '手机格式错误请重新输入' }]">
          <template #left-icon>
            <span class="iconfont icon-phone1"></span>
          </template>
        </van-field>
        <van-field
          v-model="user.code"
          type="password"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码'}, {pattern: /^\d{6}$/, message: '验证码格式错误请重新输入'}]">
          <template #button>
            <van-button class="codeBtn" round color="#ededed" size="small" type="primary">发送验证码</van-button>
          </template>
          <template #left-icon>
            <span class="iconfont icon-lock"></span>
          </template>
        </van-field>
      </van-cell-group>
      <!-- 登录按钮 -->
      <div class="loginBtn">
        <van-button :loading="isLoading" size="large" round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 导入登录的方法
import { apiLogin } from '../../api/user.js'
// 导入操作 local 的方法
import { localSet } from '../../utils/mylocal.js'
export default {
  data () {
    return {
      user: {
        phone: '17709134431',
        code: '246810'
      },
      // 用来决定是否处于加载状态
      isLoading: false
    }
  },
  methods: {
    async onSubmit () {
      // 进入时判断 isLoading 是否为flase,如果为 false说明没有请求
      if (this.isLoading === false) {
        // 将加载状态设置为 true
        this.isLoading = true
        try {
          // 登录
          const res = await apiLogin({
            mobile: this.user.phone,
            code: this.user.code
          })
          console.log('用户登录成功~~~~')
          // 将加载状态设置为 false
          this.isLoading = false
          // console.log(res.data)
          // 登录成功之后要将用户信息保存起来: token & refresh_token
          // 保存到 vuex 中
          this.$store.commit('setUserInfo', res.data.data)
          this.$toast.success('登录成功!')
          // this.$notify({ type: 'success', message: '登录成功！' })
          // 保存到 vuex 中
          localSet('userInfo', res.data.data)
          // 得到当前页面路由
          // 判断当前页面的路由
          // console.log(this.$route.path)
          if (this.$route.path === '/login') {
            this.$router.push('/home')
          } else {
            // 回退上一个页面
            this.$router.back()
          }
        } catch (error) {
          console.log(error)
          // 将加载状态设置为 false
          this.isLoading = false
          // 添加一个失败的提示
          this.$toast.fail('手机号或者验证码错误,请重新输入')
          // 跳转到登录页面
          // this.$router.push('/login')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .mytitle {
    background-color: #3e9df8;
  }
  .codeBtn {
    /deep/ .van-button__text {
      color: #666;
    }
  }
  .loginBtn {
    margin: 20px;
  }

}
</style>
