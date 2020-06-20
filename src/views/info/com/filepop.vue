<template>
  <div class="file">
      <van-popup class="filep" v-model="show">
          <div class="box">
              <div @click="infofile">从相册中选择</div>
              <input @change="changeImg" ref="myfile" type="file" style=" display: none;">
              <div class="myborder">拍照</div>
              <div @click="show = false">取消</div>
          </div>
      </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
// 导入修改用户的头像
import { apiUploadPhoto } from '../../../api/user'
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    // 点击之后从让其触发 input事件
    infofile () {
      this.$refs.myfile.click()
    },
    // 改变选中的图片
    changeImg () {
      // 关闭图片操作框
      this.show = false
      // 打开一个浏览组件
      //   ImagePreview(['https://img.yzcdn.cn/vant/apple-1.jpg'])
      const file = this.$refs.myfile.files[0]
      // 将 file 对象转为图片路径, 在预览组件中进行预览
      // 1 使用 URL.createObjectURL 方法将图片对象为路径
      //   const path = URL.createObjectURL(file)
      // 2 使用 fileReader 对象来进行处理
      // 将图片放到预览组件中进行预览
      // 2.1 创建一个 fileReader 对象
      const reader = new FileReader()
      // 2.2 使用 reader 对象将图片转为 url
      reader.readAsDataURL(file)
      // 2.3 设置转换完成之后的逻辑代码
      reader.addEventListener('load', () => {
        // 得到转换后的结果, reader.result
        // ImagePreview([reader.result])
        // 异步关闭
        ImagePreview({
          images: [
            reader.result
          ],
          // 关闭事件
          onClose: this.closeProcess
        })
      })
    },
    // 关闭预览组件之后的逻辑
    closeProcess () {
      //   console.log('我点击了关闭')
      //   提示用户是否将图片设置为头像
      this.$dialog.confirm({
        title: '提示',
        message: '是否将此图片设置为头像'
      }).then(async () => {
        // 得到图片
        const path = this.$refs.myfile.files[0]
        // 将图片提交到服务器中
        const res = await apiUploadPhoto(path)
        // 接收图片
        const newTcon = res.data.data.photo
        // 将图片传回到 info 页面中 info 属性项目
        this.$parent.info.photo = newTcon
        // 提示用户上传成功
        this.$toast.success('头像上传成功')
        console.log('确定')
      }).catch(() => {
        console.log('取消')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.file{
    .filep{
        width: 90%;
        border-radius: 5px;
        text-align: center;
        .myborder {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
        }
        .box div {
            line-height: 46px;

        }
    }
}
</style>
