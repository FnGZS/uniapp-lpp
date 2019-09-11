<template>
	<view>
		<!-- 登录授权 -->
		<view class="cu-modal" :class="modalName == 'toUserLogin' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="padding-xs">
					<button class="cu-login margin-bottom-xs" type="primary" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">
						<view class="cuIcon-weixin ">微信用户快速登录</view>
					</button>
					<text class="font_24 color_4a4a4a">请授权用户的信息，头像昵称等。</text>
				</view>
			</view>
		</view>
		<!-- 手机号授权 -->
		<view class="cu-modal" :class="modalName == 'toPhoneLogin' ? 'show' : ''">
			<view class="cu-dialog">
				<view class="padding-xs">
					<button class="cu-login" type="primary" open-type="getPhoneNumber" @getphonenumber="wxGetPhoneNumber" withCredentials="true">
						<view class="cuIcon-phone ">获取手机号</view>
					</button>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper
			class="screen-swiper"
			:indicator-dots="true"
			:circular="true"
			:autoplay="true"
			interval="5000"
			duration="500"
			indicator-color="#fff"
			indicator-active-color="#3598DC"
		>
			<swiper-item v-for="(item, index) in swiperList" :key="index"><image :src="item.url" mode="aspectFill"></image></swiper-item>
		</swiper>
		<!-- 公告 -->
		<view class="gonggao">
			<view class="gonggao-left">
				<view class="gonggao-box font_24">公告</view>
				<view class="gonggao-rightArrow"></view>
			</view>
			<swiper class="swiper_container" vertical="true" autoplay="true" circular="true" interval="2500">
				<block v-for="(item, index) in msgList" :key="index">
					<swiper-item>
						<view class="swiper_item">{{ item.title }}</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<!-- 休闲 -->
		<view class="xiuxian">
			<view class="public-title">
				<view class="public-leftLine"></view>
				<view class="public-box color_5a6c81 font_29">娱乐休闲</view>
			</view>
			<view class="cont">
			      <view class="list">
			        <view class="list-icon bc1">
			          <view class="iconfont icon-yule1"></view>
			        </view>
			        <view class="list-title">品咖</view>
			      </view>
			      <view class="list">
			        <view class="list-icon bc2">
			          <view class="iconfont icon-yule2"></view>
			        </view>
			        <view class="list-title">下棋</view>
			      </view>
			      <view class="list">
			        <view class="list-icon bc3">
			          <view class="iconfont icon-yule3"></view>
			        </view>
			        <view class="list-title">游戏</view>
			      </view>
			      <view class="list">
			        <view class="list-icon bc4">
			          <view class="iconfont icon-yule4"></view>
			        </view>
			        <view class="list-title">唱歌</view>
			      </view>
			    </view>
		</view>
		<!-- 保洁 -->
		<view class="baojie">
			<view class="public-title">
				<view class="public-leftLine"></view>
				<view class="public-box color_5a6c81 font_29">保洁推荐</view>
			</view>
			<view class="baojie-cont">
				<view class="baojie-list" @click="toCleanNormal">
					<view class="baojie-list-title font_29">常规保洁</view>
					<view class="baojie-list-text font_24">XXXX</view>
					<view class="baojie-list-go font_20">GO></view>
					<image src="http://zjw77.club/someimg/lpp_sy_baojie.png"></image>
				</view>
				<view class="baojie-list">
					<view class="baojie-list-title font_29">深度保洁</view>
					<view class="baojie-list-text font_24">XXXX</view>
					<view class="baojie-list-go font_20">GO></view>
					<image src="http://zjw77.club/someimg/lpp_sy_baojie.png"></image>
				</view>
				<view class="baojie-list">
					<view class="baojie-list-title font_29">新居开荒</view>
					<view class="baojie-list-text font_24">XXXX</view>
					<view class="baojie-list-go font_20">GO></view>
					<image src="http://zjw77.club/someimg/lpp_sy_baojie.png"></image>
				</view>
				<view class="baojie-list">
					<view class="baojie-list-title font_29">办公室店面保洁</view>
					<view class="baojie-list-text font_24">XXXX</view>
					<view class="baojie-list-go font_20">GO></view>
					<image src="http://zjw77.club/someimg/lpp_sy_baojie.png"></image>
				</view>
				<view class="baojie-list">
					<view class="baojie-list-title font_29">家居整理</view>
					<view class="baojie-list-text font_24">XXXX</view>
					<view class="baojie-list-go font_20">GO></view>
					<image src="http://zjw77.club/someimg/lpp_sy_baojie.png"></image>
				</view>
				<view class="baojie-list">
					<view class="baojie-list-title font_29">甲醛治理</view>
					<view class="baojie-list-text font_24">XXXX</view>
					<view class="baojie-list-go font_20">GO></view>
					<image src="http://zjw77.club/someimg/lpp_sy_baojie.png"></image>
				</view>
			</view>
		</view>
		<!-- 推荐 -->
		<view class="tuijian">
			<view class="public-title">
				<view class="public-leftLine"></view>
				<view class="public-box color_5a6c81 font_29">今日推荐</view>
			</view>
			<view class="tuijian-cont">
				<view class="tuijian-list">
					<image src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1034389669,3064515247&fm=26&gp=0.jpg"></image>
					<view class="tuijian-info">
						<view class="tuijian-name">吴某某</view>
						<view class="tuijian-detail">越城区 | 2-3年 | XXX</view>
						<view class="tuijian-skill">
							<view class="tuijian-skill-main">常规保洁</view>
							<view class="tuijian-skill-main">家具整理</view>
						</view>
						<view class="tuijan-label">明星保洁员</view>
					</view>
				</view>
				<view class="tuijian-list">
					<image src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=932160767,1999068792&fm=26&gp=0.jpg"></image>
					<view class="tuijian-info">
						<view class="tuijian-name">张某某</view>
						<view class="tuijian-detail">柯桥区 | 1-3年 | XXX</view>
						<view class="tuijian-skill">
							<view class="tuijian-skill-main">办公室店面保洁</view>
							<view class="tuijian-skill-main">甲醛治理</view>
						</view>
						<view class="tuijan-label">明星保洁员</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { login } from '@/common/login.js';
export default {
	data() {
		return {
			swiperList: [
				{
					id: 0,
					type: 'image',
					url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=265069926,1736566583&fm=15&gp=0.jpg'
				},
				{
					id: 1,
					type: 'image',
					url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3617678736,2551419226&fm=15&gp=0.jp'
				}
			],
			msgList: [
				{ url: 'url', title: '多地首套房贷利率上浮 热点城市渐迎零折扣时代' },
				{ url: 'url', title: '悦如公寓三周年生日趴邀你免费吃喝欢唱' },
				{ url: 'url', title: '你想和一群有志青年一起过周末嘛？' }
			],
			modalName: ''
		};
	},
	onLoad: function() {
		//判断是否第一次进入小程序
		// this.modalName = uni.getStorageSync('userInfo') ? null : 'toUserLogin';
	},
	methods: {
		wxGetUserInfo(res) {
			var that = this;
			if (!res.detail.iv) {
				uni.showToast({
					title: '您取消了授权,登录失败',
					icon: 'none'
				});
				return false;
			}
			//授权成功回调
			let callback = {};
			callback.success = function() {
				that.modalName = null;
			};
			login(callback);
		},
		wxGetPhoneNumber(res) {
			console.log(res);
		},
		toCleanNormal(){
			uni.navigateTo({
				url:'../cleanNormal/cleanNormal'
			})
		}
	}
};
</script>

<style>
page {
	background-color: #fff !important;
}
@font-face {font-family: "iconfont";
  src: url('https://at.alicdn.com/t/iconfont.eot?t=1563794167254'); /* IE9 */
  src: url('https://at.alicdn.com/t/iconfont.eot?t=1563794167254#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAWQAAsAAAAACngAAAVDAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDQAqHcIYsATYCJAMYCw4ABCAFhG0HWxvdCFGUT06I7Asc5wlKLa10hBbHBKsFAOCyggkAAAAAWCAvgODp2+93Z2Z3v4gkxCJdqybxJlo6CWIjFE7/hPKIam9rqnKSrgGgcMaCQV0LTTT/bf374yGfLHfTMlyECmALWHmwv739dhEHNpCIozBJgxQzXNA1kJcmrZPWQSEgt/luUC0NL/CrvD/f/eF+povEgeWzb3OKDItKHI3HAxpQVNDuDuhaS+QE/Yaxi8s4DAFpfX3RenRxDcscTSIwZQ/ewHJMy5VQRFIRchZmQq5ZkByXegtw5f6+fEwjCcpPaBNXt8MEdjr5PhkRE+5sFLz+zACzDAxMARzkyLVeaPviKVeazvuLjnlAWpLSTnU3cj/FMVEyFK7ImpbV/+WBcZTwkBlNmkX4xYBHlDQRGKIUAoeoi0ARHSAQ3D9p8VAZeixuAClALqic6r+zY7wQuWIrymqf02VbqWJvezuqlN8HsWAMIrkkHK+YgClTxCR5OqmoDWambOBg8TLERG5EfI6O3E9OPNvW4JUT0fpji3eIGKmYh630XXaoz8gBaZ+8S+ype7EGhA1+kVmbM2exA2y5lbtqw/sCNQeaQ3teRcjhocfxsXHBiefJkXsRgUwe6rkf2RdFlLeTW4k2Skcu5G6FAEVtKFzSAYKk9ojRQzvkXaMaemkAQMDwUBOKbh1pF62I0tYvuhc14Z4lFRhW3Iy4vStFvYsbEeRdGepe1ILjJeWYR2wRF0zqgEFyOwhCANGKARQ3uLxHE2yc5k2QJiF1V+Jc7kQ+lArvOUlqreUG9KQN2yiyuKdHMAgBlZ0QBMBNXdxwRY8kDJ8vuTui81DYfelE97eaMEGP8mbm8QpPmkyYbNTEMtdyXqIAvyAfI3rJ2cqcfkvd/uFTB00COJCk7ms7IzHr5MzH5+Q098N2kotJmInXuO4vTreMcOKwF9FVHE6BL7FU3ZmdL7ajMi5TPyScRLKfTTmhpZMk3mLQAmj3kZgndmcn+PkmZncnKhigKDuvU71E0QSJR4O06dTpWdMxirHyV7Kuzpl4xh/yk8zkQEu954/8QqkyxTLFzYmAdl1HJ6saM8yiett5q8rqPqpZlVIPxfWzqFm8UTjigv6Wlgk3ijcTvaB4zPxZFY8Qd34xmBtW8iyzxDbOipIySjPlQ1vccq3ibEtjqpIwSPbTnQTYtleB9LgZOz2bGU7PQCe5/6BnF/kGQSXGjL1euhB8QGEqHkjSJZwTDLl3P4RK3kXor5X1rpDzunz6xCR99GRWvcGblv83VVVtBRUfEniP00K0Qe9ZGVnfB9FBtPj7+GfrbGF7tXX8YaxdkvEJiB/hSreQamC6eHGP+7YKcwD26AMQR3br07/aj6m/K/tbem9JuDjE3XZQTPwYD1y15/5wMmrz/kx1ypWg3oSyQNOEFNmY61aa3Fr2YPt1fkFBWhr8kc6yv77ktdrJIJJqIaiEHpikIbTDT4GXMQ1B0gykTTpenlEh2iRTwIQvAKLoG1TeDZiiH7TD/4JX9w9BMQzS1oJzw4yROF41FTJKCdo3DDGXzjDoqpd6Sb7JjUQFLvWWpA4unAzHydAxlSR9TKmf/VTVoRMu8AgcR3nOWAnPKdZhqlrNRiOX90TDmAtYtUAQQ5EEst6gIMZKzm6uVlM/f4l4jZwhJTUl1ltE1EL7aGJoXAN9LC1r1ZxL99ozb0oph4c5ghXQETSTXPczVOX3myMxNZS28FZmRqieqysdji8vrnILkKbdGkLFxImXIAnc2eS0mknBBsMaJmtxdZ0avcJg6ZBL7w0vpC0TAAA=') format('woff2'),
  url('https://at.alicdn.com/t/iconfont.woff?t=1563794167254') format('woff'),
  url('https://at.alicdn.com/t/iconfont.ttf?t=1563794167254') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('https://at.alicdn.com/t/iconfont.svg?t=1563794167254#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 登录 */
.cu-login {
	height: 80upx;
	font-size: 35upx;
}
/* 轮播 */
.swiper_container {
	height: 55upx;
	width: 100vw;
	margin-left: 10upx;
}
.swiper_item {
	font-size: 26upx;
	line-height: 55upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	letter-spacing: 2px;
	color: #b1b1b1;
}
.screen-swiper {
	width: 750upx;
	min-height: 320upx;
}
/* 娱乐部分 */
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
.xiuxian{
  width: 100%;
  padding-bottom: 30rpx;
  border-bottom: 8rpx solid #f5f5f5;
}
.title{
  display: flex;
}
.title-col{
  width: 10rpx;
  height: 36rpx;
  background: #0FA1E2;
  margin-left: 5%;
  border-radius: 5rpx;
}
.title-text{
  line-height: 36rpx;
  margin-left: 10rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #5A6C81;
}
.xiuxian .cont{
  display: flex;
  width: 90%;
  margin-left: 5%;
}
.list{
  margin-top: 20rpx;
  width: 25%;
}
.list-icon{
  margin: auto;
  width: 90rpx;
  height: 90rpx;
  border-radius: 50%;
}
.icon-yule1{
  color: #fff;
  font-size: 48rpx;
  text-align: center;
  line-height: 90rpx;
}
.icon-yule2{
  color: #fff;
  font-size: 48rpx;
  text-align: center;
  line-height: 90rpx;
}
.icon-yule3{
  color: #fff;
  font-size: 48rpx;
  text-align: center;
  line-height: 90rpx;
}
.icon-yule4{
  color: #fff;
  font-size: 48rpx;
  text-align: center;
  line-height: 90rpx;
}
.bc1{
  background: #FF7AAF;
}
.bc2{
  background: #FB936E;
}
.bc3{
  background: #76B1FF;
}
.bc4{
  background: #D099FF;
}
.list-title{
  font-size: 25rpx;
  margin-top: 10rpx;
  text-align: center;
  color: #4A4A4A;
}
/* 公告部分 */
.gonggao {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 750upx;
	height: 74upx;
	border-bottom: 8upx solid #f8f8f8;
	background: #fff;
}
.gonggao-left {
	position: relative;
	width: 184upx;
	height: 34upx;
	border-right: 2upx solid #c3c3c3;
}
.gonggao-box {
	position: absolute;
	z-index: 2;
	right: 30upx;
	bottom: -2upx;
	width: 78upx;
	height: 36upx;
	background: linear-gradient(to right, #ff8a00, #ffce08);
	color: #fff;
	text-align: center;
	border-radius: 4upx;
}
.gonggao-rightArrow {
	position: absolute;
	bottom: 4upx;
	right: 16upx;
	z-index: 1;
	width: 0;
	height: 0;
	border-top: 0 solid transparent;
	border-bottom: 14upx solid transparent;
	border-left: 16upx solid #ff8a00;
	opacity: 0.42;
}


/* 常规保洁 */
.baojie-cont {
	padding: 0 20upx 30upx 30upx;
	display: flex;
	flex-wrap: wrap;
	border-bottom: 8upx solid #f8f8f8;
}
.baojie-list {
	margin: 0 10upx 10upx 0;
	width: 340upx;
	height: 180upx;
	background: #f8f8f8;
	border: 1upx solid #EEEEEE;
	position: relative;
}
.baojie-list-title {
	color: #333333;
	margin-top: 24upx;
	margin-left: 18upx;
	font-weight: 600;
}
.baojie-list-text {
	color: #777777;
	margin-top: 10upx;
	margin-left: 20upx;
}
.baojie-list-go {
	color: #b19c71;
	border: 1upx solid #b19c71;
	text-align: center;
	border-radius: 4upx;
	width: 60upx;
	padding: 2upx 5upx;
	margin-left: 20upx;
	margin-top: 10upx;
}
.baojie-list image {
	position: absolute;
	right: 20upx;
	top: 20upx;
	width: 100upx;
	height: 140upx;
}
/* 推荐 */
.tuijian-cont {
	padding: 0 30upx;
	margin-bottom: 50upx;
}
.tuijian-list {
	display: flex;
	position: relative;
	box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.1);
	border: 1upx solid #f4f4f4;
	margin-bottom: 20upx;
}
.tuijian-list image {
	margin: 30upx 30upx;
	width: 180upx;
	height: 180upx;
	border-radius: 50%;
}
.tuijian-name {
	color: #3c3c3c;
	margin-top: 50upx;
	margin-left: 20upx;
	font-size: 33upx;
	font-weight: bold;
}
.tuijian-detail {
	color: #919191;
	margin-top: 10upx;
	margin-left: 20upx;
	font-size: 28upx;
}
.tuijian-skill {
	display: flex;
}
.tuijian-skill-main {
	margin-top: 20upx;
	margin-left: 20upx;
	padding: 5upx 10upx;
	font-size: 25upx;
	border: 2upx solid #e7e6ec;
	border-radius: 10upx;
	color: #c1c1c1;
}
.tuijan-label {
	position: absolute;
	top: 50upx;
	right: 30upx;
	font-size: 23upx;
	color: #fff;
	background: #ff3366;
	padding: 2upx 10upx;
	border-radius: 5upx;
}
</style>
