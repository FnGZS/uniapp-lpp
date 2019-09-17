<template>
  <view class="content">
    <view class="message-list">
      <message-action :options="options" :messagesList="messages"></message-action>
    </view>
  </view>
</template>

<script>
import messageAction from "../../components/message-action.vue";
export default {
  components: { messageAction },
  data() {
    return {
      focus: false,
      isShowView: true,
      options: [
        {
          text: "置顶",
          style: {
            backgroundColor: "#C7C6CD"
          }
        },
        {
          text: "删除",
          style: {
            backgroundColor: "#dd524d"
          }
        }
      ],
      messages: [
        {
          title: "系统消息",
          url: [
            "http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg"
          ],
          message: "这是一条系统消息",
          time: "15:15",
          count: 5,
          stick: false, //是否为置顶状态
          disabled: false, //是否禁止滑动
          type: 1 //通知类型消息
        },
        {
          title: "消息任务",
          url: [
            "http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg"
          ],
          message: "这是一条消息任务",
          time: "15:15",
          count: 5,
          stick: false, //是否为置顶状态
          disabled: false, //是否禁止滑动
          type: 1 //通知类型消息
        },
        {
          title: "小二",
          url: [
            "https://pic.qqtn.com/up/2019-9/15686176846153791.jpg"
          ],
          message: "什么鬼，我有支付宝[禁止滑动]",
          time: "15:15",
          count: 5,
          stick: false, //是否为置顶状态
          disabled: true, //是否禁止滑动
          type: 2 //普通用户类型消息
        },
        {
          title: "小三",
          url: [
            "https://pic.qqtn.com/up/2019-9/15686806355125883.jpg"
          ],
          message: "约吗",
          time: "12:13",
          count: 1,
          stick: false,
          disabled: false, //是否禁止滑动
          type: 2 //普通用户类型消息
        },
		
        // {
        //   title: "四菜一汤",
        //   url: [
        //     "http://img3.imgtn.bdimg.com/it/u=1961689344,1827468357&fm=26&gp=0.jpg",
        //     "http://img1.imgtn.bdimg.com/it/u=1298910508,2156767473&fm=26&gp=0.jpg",
        //     "http://img3.imgtn.bdimg.com/it/u=1961689344,1827468357&fm=26&gp=0.jpg",
        //     "http://img3.imgtn.bdimg.com/it/u=1961689344,1827468357&fm=26&gp=0.jpg"
        //   ],
        //   message: "[语音]32秒",
        //   time: "15:15",
        //   count: 22,
        //   stick: true,
        //   disabled: false, //是否禁止滑动
        //   type: 3 //群组消息
        // },
        {
          title: "女神",
          url: [
            "https://pic.qqtn.com/up/2019-9/15679888297606459.jpg"
          ],
          message: "我爱你",
          time: "12:11",
          count: 0,
          stick: false,
          disabled: false, //是否禁止滑动
          type: 2 //普通用户类型消息
        }
      ]
    };
  },
  onLoad() {},
  methods: {
  },
  onNavigationBarButtonTap(e) {
    if (e.index == 0) {
      this.floatingMenuShow = !this.floatingMenuShow;
    }
  }
};
</script>

<style scoped="true" lang="scss" >
.floating-menus {
  position: fixed;
  top: 0;
  right: 20upx;
  z-index: 10;
  opacity: 0;
  transition: all 0.4s;
  height: 0;
  overflow: hidden;
}
.floating-menus {
  &.show {
    opacity: 1;
    height: auto;
  }
  &.hidden {
    opacity: 0;
    height: 0;
  }
}
</style>
