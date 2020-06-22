<template>
    <div class="zhi">
        <!-- 头部标题 -->
        <van-nav-bar @click-left="$router.back()" left-arrow :fixed="true" class="mytitle" title="小智同学" />
        <!-- 聊天区域 -->
        <div class="mychat">
            <div class="item" :class="{ user: item.isRobot === false }" v-for="(item, index) in chatArr" :key="index">
                <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=490364958,3069378602&fm=26&gp=0.jpg" alt="">
                <div class="content">{{ item.content }}</div>
            </div>
        </div>
        <!-- 输入框 -->
        <van-field class="myfield" v-model="value" clearable>
            <template #button>
                <van-button @click="send" size="small" type="primary">发送</van-button>
            </template>
        </van-field>
    </div>
</template>

<script>
// 导入 socket
import io from 'socket.io-client'
export default {
  data () {
    return {
      value: '',
      // 定义一个数组用来保存聊天记录
      chatArr: [
        { content: '你好我是小智同学~~', isRobot: true }
      ],
      // 创建一个 socket 对象
      socket: null
    }
  },
  methods: {
    // 发送聊天内容
    send () {
      // 将聊天内容添加到服务器L 必须要先使用 socket.io-client 来连接服务器
      this.socket.emit('message', {
        msg: this.value,
        timestamp: Date.now()
      })
      // 将发送的信息添加到聊天数组中
      this.chatArr.push({
        content: this.value,
        isRobot: false
      })
    }
  },
  mounted () {
    // 判断是否登录
    if (!this.$login()) {
      return
    }
    // 得到toekn
    const token = this.$store.state.userInfo.token
    // 连接服务器: socket 可以用来发送 & 接收请求
    this.socket = io(`http://ttapi.research.itcast.cn?token=${token}`)
    // 接收消息
    this.socket.on('message', res => {
      this.chatArr.push({
        content: res.msg,
        isRobot: true
      })
    })
  }
}
</script>

<style lang="less" scoped>
.zhi {
    .mytitle {
        background-color: #3e9df8;
        /deep/ .van-nav-bar__title {
            color: #fff;
        }
        /deep/ .van-nav-bar__arrow {
            color: #fff;
        }
    }
    .myfield {
        position: fixed;
        bottom: 0px;
        left: 0px;
        background-color: #ddd;
        /deep/ .van-field__control {
            border: 1px solid #666;
            border-radius: 25px;
            padding: 5px;
            padding-left: 10px;
        }
    }
    .mychat {
        width: 100%;
        background-color: rgb(226, 211, 211);
        position: fixed;
        top: 46px;
        bottom: 56px;
        .item {
            overflow: hidden;
            margin: 10px;
            img {
                float: left;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
            }
            .content {
                float: left;
                border: 1px solid #c8ddec;
                background: #e0effb;
                padding: 8px;
                border-radius: 10px;
            }
        }
        .user {
            img {
                float: right;
                margin-right: 0px;
                margin-left: 10px;
            }
            .content {
                float: right;
            }
        }
    }
}
</style>
