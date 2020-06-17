<template>
    <van-cell>
        <template #title>
            <div class="comment">
                <div class="img">
                    <img :src="item.aut_photo" alt="">
                </div>
                <div class="msg">
                    <div class="authName">{{item.aut_name}}</div>
                    <div class="content">{{item.content}}</div>
                    <div class="other">
                        <span class="time">{{item.pubdate | timefilter}}</span>
                        <span class="repeat">回复{{item.reply_count}}</span>
                    </div>
                </div>
                <div class="like">
                    <van-icon :color="item.is_liking ? 'red' : '#666'" name="like" />{{item.like_count}}
                </div>
            </div>
        </template>
    </van-cell>
</template>

<script>
export default {
  // 接收父组件的item
  props: ['item']
}
</script>

<style lang="less" scoped>
.comment {
    display: flex;
    .img {
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
        }
    }
    .msg {
        flex: 1;
        .authName {
            color: skyblue
        }
        .content {
            padding: 10px;
        }
        .repeat {
            padding: 6px 10px;
            background-color: #ccc;
            border-radius: 20px;
            margin-left: 20px;
        }
    }
}
</style>
