// 导入 vue
import Vue from 'vue'
// 导入 dayjs
import dayjs from 'dayjs'
// 导入插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入语言包
import 'dayjs/locale/zh-cn'
// 扩展插件
dayjs.extend(relativeTime)
// 全局使用语言
dayjs.locale('zh-cn')

// 创建一个过滤器
Vue.filter('timefilter', function (value) {
  // 处理时间
  return dayjs().from(dayjs(value))
})

// // 过滤器的使用步骤：
// //  1.0 定义
// Vue.filter('filtername', function (value) {
//   // value 就是使用这个过滤器的数据
// })
// //  2.0 使用
// {{ 'xxx' | filtername }}
