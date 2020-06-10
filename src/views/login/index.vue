<template>
    <div class="login">
        <!-- 头部标题 -->
        <van-nav-bar class="mytitle" title="登录" />
        <!-- 手机号&验证码输入框 -->
        <van-form @submit="onSubmit">
            <van-cell-group>
                <van-field :rules="[{ required: true, message: '请填写手机号' }]" v-model="user.phone" placeholder="请输入手机号">
                    <template #left-icon>
                        <span class="iconfont icon-phone1"></span>
                    </template>
                </van-field>
                <van-field :rules="[{ required: true, message: '请填写验证码' }]" v-model="user.code" placeholder="请输入验证码">
                    <template #button>
                        <van-button class="codebtn" round color="#ededed" size="small" type="primary">发送验证码</van-button>
                    </template>
                    <template #left-icon>
                        <span class="iconfont icon-lock"></span>
                    </template>
                </van-field>
            </van-cell-group>
            <!-- 登录按钮 -->
            <div class="loginBtn">
                <van-button type="info" size="large">登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
// 导入 axios
import { apiLogin } from '../../api/user.js'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        phone: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    // 直接导入
    // onSubmit () {
    //   // 1.0 准备接口所需的参数： mobile, code => user 中得到
    //   // 2.0 请求服务器的接口：登录注册（使用 axios）
    //   axios({
    //     url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
    //     method: 'POST',
    //     data: {
    //       mobile: this.user.phone,
    //       code: this.user.code
    //     }
    //   }).then(res => {
    //     // 3.0 接口服务器返回的数据
    //     console.log(res.data) // { 'token': '', 'refresh_token': ''}
    //     // 4.0 进行后续的逻辑处理
    //     this.$router.push('/home')
    //   })
    // }
    // console.log(---------------------------------------------------------------------------);
    async onSubmit () {
      // 登录
      const res = await apiLogin({
        mobile: this.user.phone,
        code: this.user.code
      })
      console.log(res.data)
      // 登录成功之后要将用户信息保存起来 token & refresh_token
      // 保存到vuex 中
      this.$store.commit('setUserInfo', res.data.data)
      console.log(this.$store.state.userInfo)
      // 保存到 localstorage 中
      window.localStorage.setItem('userInfo', JSON.stringify(res.data.data))
    }
  }
}
</script>

<style lang="less" scoped>
.login {
    .mytitle {
        background-color: #3e9df8;
        /deep/ .van-nav-bar__title {
            color: #fff;
        }
    }
    .codebtn {
        /deep/ .van-button__text {
            color: #666;
        }
    }
    .loginBtn {
        margin: 20px;
    }
}
</style>
