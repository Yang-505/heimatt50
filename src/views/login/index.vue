<template>
  <div class="login">
      <!-- 头部标签 -->
    <van-nav-bar class="mytitle" title="登录 "/>
    <!-- 手机号&验证码输入框 -->
    <van-cell-group>
        <van-field left-icon="smile-o" v-model="user.phone"  placeholder="请输入手机号">
            <template #left-icon>
                <span class="iconfont icon-phone"></span>
            </template>
        </van-field>
        <van-field v-model="user.code"  placeholder="请输入密码">
            <template #button>
                <van-button round class="codebtn" color="#ededed" size="small" type="primary">发送验证码</van-button>
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
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        phone: '',
        code: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login{
    .mytitle{
        background-color: #3e9df8;
        /deep/ .van-nav-bar__title {
            color: #fff;
        }
    }
    .codebtn{
        /deep/ .van-button__text{
            color: #666;
        }
    }
    .loginBtn{
        margin: 20px;
    }
}
</style>
