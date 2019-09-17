<template>
	<view>
		<view class="orderBox">
			<image src="../../static/img/gujia.png" mode=""></image>
			<view class="orderTop">
				<view class="orderTopText">
					<span class="color_959595">业主:</span>
					<span class="color_4a4a4a">王先生</span>
				</view>
				<view class="orderTopText">
					<span class="color_959595">地址:</span>
					<span class="color_4a4a4a">绍兴格林豪泰</span>
				</view>
				<view class="orderTopText lastText">
					<span class="color_959595">预约时间:</span>
					<span class="color_4a4a4a">2019/9/16下午</span>
				</view>
			</view>
			<view class="orderBottom">
				<view class="orderBottomText">
					<span class="color_959595">姓名:</span>
					<span class="color_4a4a4a">唐菲</span>
				</view>
				<view class="orderBottomText">
					<span class="color_959595">电话:</span>
					<span class="color_4a4a4a">123123151564</span>
				</view>
				<view class="orderBottomText lastText">
					<span class="color_959595 font_22">支付说明:</span>
					<span class="color_4a4a4a font_22">提交订单先付估价的一层定金，服务完成支付余款</span>
				</view>
			</view>
		</view>
		<view class="orderMoney">
			<span class="font_40 color_959595">估价：</span>
			<span class="font_40 color_959595">￥8888</span>
		</view>
		<view class="orderDingMoney"><span class="font_30 color_959595">x0.1</span></view>
		<view class="orderDingMoney">
			<span class="font_30">定金：</span>
			<span class="font_30 color_red">￥888</span>
		</view>
		<view class="subBtn">立即支付</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		//下一页
		toSub() {
			uni.navigateTo({
				url: '../subscribeSub/subscribeSub'
			});
		}
	}
};
</script>

<style>
.orderBox {
	position: relative;
	margin-top: 10upx;
	width: 750upx;
	height: 1030upx;
}
.orderBox image {
	width: 100%;
	height: 100%;
}
.orderTop,
.orderBottom {
	width: 670upx;
	height: 300upx;
	position: absolute;
	top: 290upx;
	left: 40upx;
}
.orderBottom {
	top: 729upx;
}
.orderTopText,
.orderBottomText {
	width: 100%;
	height: 100upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	line-height: 100upx;
	font-size: 30upx;
}
.lastText {
	line-height: 70upx;
}
.orderMoney {
	width: 690upx;
	margin: 10upx auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 30upx;
}
.orderDingMoney {
	width: 690upx;
	margin: 10upx auto;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}
.subBtn {
	position: relative;
	background: #3598dc;
	width: 690upx;
	height: 84upx;
	margin: 20upx auto;
	color: #ffffff;
	line-height: 84upx;
	font-size: 30upx;
	text-align: center;
}
</style>
