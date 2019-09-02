<template >
	<view>
		<!-- 登录授权 -->
		<view class="cu-modal" :class="modalName=='toUserLogin'?'show':''">
			<view class="cu-dialog">
				<view class="padding-xs">
					<button class="cu-login margin-bottom-xs" type="primary"  open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true"><view class="cuIcon-weixin ">微信用户快速登录</view></button>
					<text class="font_24 color_4a4a4a">请授权用户的信息，头像昵称等。</text>
				</view>
			</view>
		</view>
		<!-- 手机号授权 -->
		<view class="cu-modal" :class="modalName=='toPhoneLogin'?'show':''">
			<view class="cu-dialog">
				<view class="padding-xs">
					<button class="cu-login" type="primary"  open-type="getPhoneNumber" @getphonenumber="wxGetPhoneNumber" withCredentials="true"><view class="cuIcon-phone ">获取手机号</view></button>
				</view>
			</view>
		</view>
		<swiper class="screen-swiper" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" indicator-color="#fff" indicator-active-color="#3598DC">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" ></image>
			</swiper-item>
		</swiper>
		<view class="gonggao">
		    <view class="gonggao-left">
		      <view class="iconfont icon-gonggao"></view>
		    </view>
		    <swiper class="swiper_container" vertical="true" autoplay="true" circular="true" interval="2500">
		      <block v-for="(item,index) in msgList" :key="index">
		          <swiper-item>
		            <view class="swiper_item">{{item.title}}</view>
		          </swiper-item>
		      </block>
		    </swiper>
		  </view>
	</view>
</template>

<script>
	import {login} from '@/common/login.js'
	export default {
		data() {
			return {
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=265069926,1736566583&fm=15&gp=0.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3617678736,2551419226&fm=15&gp=0.jp',
				}],
				msgList: [
				        { url: "url", title: "公告：多地首套房贷利率上浮 热点城市渐迎零折扣时代" },
				        { url: "url", title: "公告：悦如公寓三周年生日趴邀你免费吃喝欢唱" },
				        { url: "url", title: "公告：你想和一群有志青年一起过周末嘛？" }],
						modalName:''
			}
		},
		onLaunch: function() {
			//判断是否第一次进入小程序
			this.modalName=login()?null:'toUserLogin'
		},
		methods: {
			wxGetUserInfo(res){
				var that = this
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,登录失败",
						icon: "none"
					});
					return false;
				}
				//授权成功回调
				let callback = {}
				callback.success = function(){
					that.modalName = null
				}
				login(callback)
			},
			wxGetPhoneNumber(res){
				console.log(res)
			}
		}
	}
</script>

<style>

@font-face {font-family: "iconfont";
  src: url('https://at.alicdn.com/iconfont.eot?t=1563794167254'); /* IE9 */
  src: url('https://at.alicdn.com/iconfont.eot?t=1563794167254#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAWQAAsAAAAACngAAAVDAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDQAqHcIYsATYCJAMYCw4ABCAFhG0HWxvdCFGUT06I7Asc5wlKLa10hBbHBKsFAOCyggkAAAAAWCAvgODp2+93Z2Z3v4gkxCJdqybxJlo6CWIjFE7/hPKIam9rqnKSrgGgcMaCQV0LTTT/bf374yGfLHfTMlyECmALWHmwv739dhEHNpCIozBJgxQzXNA1kJcmrZPWQSEgt/luUC0NL/CrvD/f/eF+povEgeWzb3OKDItKHI3HAxpQVNDuDuhaS+QE/Yaxi8s4DAFpfX3RenRxDcscTSIwZQ/ewHJMy5VQRFIRchZmQq5ZkByXegtw5f6+fEwjCcpPaBNXt8MEdjr5PhkRE+5sFLz+zACzDAxMARzkyLVeaPviKVeazvuLjnlAWpLSTnU3cj/FMVEyFK7ImpbV/+WBcZTwkBlNmkX4xYBHlDQRGKIUAoeoi0ARHSAQ3D9p8VAZeixuAClALqic6r+zY7wQuWIrymqf02VbqWJvezuqlN8HsWAMIrkkHK+YgClTxCR5OqmoDWambOBg8TLERG5EfI6O3E9OPNvW4JUT0fpji3eIGKmYh630XXaoz8gBaZ+8S+ype7EGhA1+kVmbM2exA2y5lbtqw/sCNQeaQ3teRcjhocfxsXHBiefJkXsRgUwe6rkf2RdFlLeTW4k2Skcu5G6FAEVtKFzSAYKk9ojRQzvkXaMaemkAQMDwUBOKbh1pF62I0tYvuhc14Z4lFRhW3Iy4vStFvYsbEeRdGepe1ILjJeWYR2wRF0zqgEFyOwhCANGKARQ3uLxHE2yc5k2QJiF1V+Jc7kQ+lArvOUlqreUG9KQN2yiyuKdHMAgBlZ0QBMBNXdxwRY8kDJ8vuTui81DYfelE97eaMEGP8mbm8QpPmkyYbNTEMtdyXqIAvyAfI3rJ2cqcfkvd/uFTB00COJCk7ms7IzHr5MzH5+Q098N2kotJmInXuO4vTreMcOKwF9FVHE6BL7FU3ZmdL7ajMi5TPyScRLKfTTmhpZMk3mLQAmj3kZgndmcn+PkmZncnKhigKDuvU71E0QSJR4O06dTpWdMxirHyV7Kuzpl4xh/yk8zkQEu954/8QqkyxTLFzYmAdl1HJ6saM8yiett5q8rqPqpZlVIPxfWzqFm8UTjigv6Wlgk3ijcTvaB4zPxZFY8Qd34xmBtW8iyzxDbOipIySjPlQ1vccq3ibEtjqpIwSPbTnQTYtleB9LgZOz2bGU7PQCe5/6BnF/kGQSXGjL1euhB8QGEqHkjSJZwTDLl3P4RK3kXor5X1rpDzunz6xCR99GRWvcGblv83VVVtBRUfEniP00K0Qe9ZGVnfB9FBtPj7+GfrbGF7tXX8YaxdkvEJiB/hSreQamC6eHGP+7YKcwD26AMQR3br07/aj6m/K/tbem9JuDjE3XZQTPwYD1y15/5wMmrz/kx1ypWg3oSyQNOEFNmY61aa3Fr2YPt1fkFBWhr8kc6yv77ktdrJIJJqIaiEHpikIbTDT4GXMQ1B0gykTTpenlEh2iRTwIQvAKLoG1TeDZiiH7TD/4JX9w9BMQzS1oJzw4yROF41FTJKCdo3DDGXzjDoqpd6Sb7JjUQFLvWWpA4unAzHydAxlSR9TKmf/VTVoRMu8AgcR3nOWAnPKdZhqlrNRiOX90TDmAtYtUAQQ5EEst6gIMZKzm6uVlM/f4l4jZwhJTUl1ltE1EL7aGJoXAN9LC1r1ZxL99ozb0oph4c5ghXQETSTXPczVOX3myMxNZS28FZmRqieqysdji8vrnILkKbdGkLFxImXIAnc2eS0mknBBsMaJmtxdZ0avcJg6ZBL7w0vpC0TAAA=') format('woff2'),
  url('https://at.alicdn.com/iconfont.woff?t=1563794167254') format('woff'),
  url('https://at.alicdn.com/iconfont.ttf?t=1563794167254') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('https://at.alicdn.com/iconfont.svg?t=1563794167254#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-yule1:before {
  content: "\e666";
}

.icon-yule2:before {
  content: "\e61c";
}

.icon-yule3:before {
  content: "\e608";
}

.icon-gonggao:before {
  content: "\e609";
}

.icon-yule4:before {
  content: "\e7f1";
}
page {
    background-color: #fff !important;
}
.gonggao{
  display: flex;
  margin-left: 5%;
  width: 100%;
  height: 55upx;
  margin-top: 10upx;
  border-bottom: 8upx solid #f5f5f5;
  background: #fff;
}
.gonggao-left{
  /* border-right: 1upx solid #ddd; */
}
.icon-gonggao{
  background: linear-gradient(to right, #f2994a, #f2c94c);
  color: #fff;
  padding: 5upx 8upx;
}
.swiper_container {
  height: 55upx;
  width: 100vw;
  margin-left: 10upx;
}

.swiper_item {
  /* height: 30upx; */
  /* margin-top: 25upx; */
  margin-top: 7upx;
  font-size: 23upx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: 2px;
  color: #B1B1B1;
}
.cu-login{
	height:80upx;
	font-size:35upx;
}
</style>
