<template>
	<view id="aboutUs">
		<view class="logo">
			<image src="../../../static/logo.jpg" mode=""></image>
		</view>
		<view class="banben">V 1.0.0</view>
		<view class="content">绿泡泡家政是专业的家政服务平台，绿泡泡家政是专业的家政服务平台，绿泡泡家政是专业的家政服务平台，绿泡泡家政是专业的家政服务平台，绿泡泡家政是专业的家政服务平台。</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
		},
		methods: {
		}
	}
</script>

<style>
	page{
		background: #fff;
		color: #A9A9A9;
	}
	.logo image{
		width: 150upx;
		height: 150upx;
		border-radius: 20upx;
		margin-left: 50%;
		margin-top: 100upx;
		position: absolute;
		left: -75upx;
	}
	.banben{
		position: absolute;
		width: 150upx;
		text-align: center;
		left: -75upx;
		margin-left: 50%;
		top: 280upx;
		color: #000000;
	}
	.content{
		position: absolute;
		width: 90%;
		top: 380upx;
		margin-left: 5%;
		font-size: 28upx;
		line-height: 40upx;
	}
</style>
