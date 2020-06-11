<template>
  <div class="login">
    <!-- 头部标题 -->
    <van-nav-bar class="mytitle" title="登录" />
    <!-- 手机号&验证码输入框 -->
    <van-form @submit="onSubmit">
  <van-cell-group>
   <van-field
    v-model="user.phone"
    name="手机号"
    placeholder="手机号"
    :rules="[{ required: true, message: '请填写手机号' },{ pattern:/^1[3456789][0-9]{9}$/, message: '手机格式错误请重新输入' }]">
    <template #left-icon>
      <span class="iconfont icon-phone"></span>
    </template>
    </van-field>
  <van-field
    v-model="user.code"
    type="password"
    placeholder="请输入验证码"
    :rules="[{ required: true, message: '请填写验证码' }]">
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
    <van-button round block type="info" size="large">
      登录
    </van-button>
  </div>
</van-form>
  </div>
</template>

<script>
// 导入 aixos
import axios from 'axios'
export default {
  data () {
    return {
      // 模型
      user: {
        phone: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    // 1 准备接口所需的参数: mobile, code => user中得到
    // 2 请求服务器的接口: 登录注册(使用axios)
    onSubmit () {
      axios({
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        method: 'POST',
        data: {
          mobile: this.user.phone,
          code: this.user.code
        }
      }).then(res => {
      // 3.接口服务器返回的数据
        console.log(res.data)
        // 4.进行后续的逻辑处理
        this.$router.push('/index')
      })
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
