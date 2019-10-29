<template>
	<view id='orderDetail'>
		<view class='orderStatus'>
			<view class='orderStatusText' v-if="orderDetail.orderStatus==1">取消预约</view>
			<view class='orderStatusText' v-if="orderDetail.orderStatus==1">预约中</view>
			<view class='orderStatusText' v-if="orderDetail.orderStatus==2">已预约</view>
			<view class='orderStatusText' v-if="orderDetail.orderStatus==3">预约关闭</view>
		</view>
		<view class='orderAddress'>
			<view class='iconfont icon-dizhi'></view>
			<view class='orderAddress-main'>
				<text class='orderAddress-main-name'>{{orderDetail.consignee}}</text>
				<text class='orderAddress-main-phone'>{{orderDetail.receivePhone}}</text>
				<view class='orderAddress-main-pos'>{{orderDetail.receiveAddress}}</view>
			</view>
		</view>
		<view class="goods-list">
			<view class="list-title">基础信息 </view>
			<view class="a-goods" key="index">
				<view class="img-box">
					<image :src="orderDetail.goodsImg" mode='aspectFill' class="img" />
				</view>
				<view class="text-box">
					<view class="arow arow01">
						<view class="goods-name">{{orderDetail.goodsTitle}}</view>
						<view class="goods-price">¥ {{orderDetail.orderPrice}}</view>
					</view>
					<view class="arow">
						<view class="goods-label">{{orderDetail.goodsContent}}</view>
						<view class="goods-num">x 1</view>
					</view>
				</view>
			</view>
			<view class='orderPrice'>
				<view class='orderPrice-text'>订单总价</view>
				<view class='orderPrice-num'>￥{{orderDetail.orderPrice}}</view>
			</view>
			<view class='orderPayPrice'>
				<view class='orderPayPrice-text' v-if="orderDetail.orderState == 0">需付款</view>
				<view class='orderPayPrice-text' v-if="orderDetail.orderState != 0">已付款</view>
				<view class='orderPayPrice-num'>￥{{orderDetail.pay_num}}</view>
			</view>
		</view>
		<view class='orderMes'>
			<view class='orderMes-title'>订单信息</view>
			<view class='orderNum'>
				<view class='orderNum-Text'>订单编号</view>
				<view class='orderNum-number'>{{orderDetail.orderId}}</view>
			</view>
			<view class='orderTime'>
				<view class='orderTime-Text'>下单时间</view>
				<view class='orderTime-number'>{{orderDetail.gmtCreated}}</view>
			</view>
			<!-- <view class='orderPayWay'>
				<view class='orderPayWay-Text'>支付方式</view>
				<view class='orderPayWay-number'>在线支付</view>
			</view> -->
		</view>
		<view class='barBottom'>
			<view class='orderStatusBtn'>
				<button class="cu-btn block line-grey " v-if="orderDetail.orderStatus==1">取消预约</button>
				<button class="cu-btn block line-blue " v-if="orderDetail.orderStatus==1">预约中</button>
				<button class="cu-btn block line-cyan "  v-if="orderDetail.orderStatus==2">已预约</button>
				<button class="cu-btn block line-gray "  v-if="orderDetail.orderStatus==3">预约关闭</button>
				<!-- <button class="cu-btn block line-grey sm" v-if="orderDetail.goodsState==0 && orderDetail.fuwuState == 2">取消订单</button>
				<button class="cu-btn block line-red sm"  v-if="orderDetail.goodsState==0 && orderDetail.fuwuState == 2">立即支付</button>
				<button class="cu-btn block line-gray sm" v-if="orderDetail.goodsState==0 && orderDetail.fuwuState == 0">预约失败</button>
				<button class="cu-btn block line-blue sm" v-if="orderDetail.goodsState==0 && orderDetail.fuwuState == 1">预约中</button>
				<button class="cu-btn block line-cyan sm"  v-if="orderDetail.goodsState==1 && orderDetail.fuwuState == 2">待服务</button>
				<button class="cu-btn block line-green sm"  v-if="orderDetail.goodsState==1 && orderDetail.fuwuState == 3">服务中</button>
				<button class="cu-btn block line-orange sm"  v-if="orderDetail.goodsState==1 && orderDetail.fuwuState == 4">去评价</button>
				<button class="cu-btn block line-pink sm"  v-if="orderDetail.goodsState==1 && orderDetail.fuwuState ==4">付尾款</button>
				<button class="cu-btn block line-pink sm"  v-if="orderDetail.goodsState==1 && orderDetail.fuwuState ==5">已评价</button> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isUser:1,
				orderDetail: {
					code: "200",
					consignee: "钟佳闱",
					gmtCreated: "2019-10-22 18:18:47",
					goodsContent: "常规清洁",
					goodsId: 36,
					goodsImg: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg",
					goodsNum: 0,
					goodsState: 0,
					goodsTitle: "王小姐",
					goodsType: "常规清洁",
					headImgUrl: "https://wx.qlogo.cn/mmopen/vi_32/xF183KBwd3dN4mQk483ZNr8vUu94nGibhqmHghSKrEw7Gcr4rpKErFGrCbnNmSoj2aBuAiaGSicwN8PHoZjoqqQhw/132",
					id: 36,
					orderStatus: 2,
					message: "",
					oldPrice: "50.00",
					orderId: "12019082018184789852671929861789",
					orderPrice: 100,
					pay_num:20,
					orderState: 2,
					postion: "北区11幢236",
					price: "0.01",
					receiveAddress: "浙江省杭州市西湖区文三西路翠苑街道康新花园A座",
					receivePhone: "17857058385",
					telephone: "17857058385",
					
				}
			}
		},
		onLoad() {},
		methods: {

		}
	}
</script>

<style>
	@font-face {
		font-family: "iconfont";
		src: url('https://at.alicdn.com/t/iconfont.eot?t=1545902147596');
		src: url('https://at.alicdn.com/t/iconfont.eot?t=1545902147596#iefix') format('embedded-opentype'),
			url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAARAAAsAAAAABoQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY8yEhEY21hcAAAAYAAAABLAAABcOd6tqBnbHlmAAABzAAAAJAAAACQsCuR6WhlYWQAAAJcAAAALwAAADYTtLaDaGhlYQAAAowAAAAcAAAAJAfeA4NobXR4AAACqAAAAAgAAAAICAAAAGxvY2EAAAKwAAAABgAAAAYASAAAbWF4cAAAArgAAAAgAAAAIAEQADRuYW1lAAAC2AAAAUUAAAJtPlT+fXBvc3QAAAQgAAAAHgAAAC/OentveJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWCcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGByeBT0LYm7438AQw9zA0AAUZgTJAQDp9QyHeJxjYGBgZWBgYAZiHSBmYWBgDGFgZAABP6AoI1icmYELLM7CoARWwwISfxb0/z+MBPJZwCQDIxvDKOABkzJQHjisIJiBEQDxbgqxAAAEAAD/gAOyA4AADQAZABoAJwAABScmACc+ATceARcGAAcDDgEHHgEXPgE3LgEDIx4CMj4BNy4BJw4BAgAlJP6vGAX1uLj1BRj+ryQle6MDCsxLS8wKA6N7kQEmRExEJgECUj09UoAWDAE0+Ln0BQX0ufj+zAwDWQOje5PiLi7ik3uj/uInQicnQic+UQICUXicY2BkYGAA4vdf7XTj+W2+MnCzMIDADa+dzgj6fwMLA3MDkMvBwAQSBQAyWApMAHicY2BkYGBu+N/AEMPCAAJAkpEBFTABAEcIAmsEAAAABAAAAAAAAAAASAAAAAEAAAACACgABAAAAAAAAgAAAAoACgAAAP8AAAAAAAB4nGWPTU7DMBCFX/oHpBKqqGCH5AViASj9EatuWFRq911036ZOmyqJI8et1ANwHo7ACTgC3IA78EgnmzaWx9+8eWNPANzgBx6O3y33kT1cMjtyDRe4F65TfxBukF+Em2jjVbhF/U3YxzOmwm10YXmD17hi9oR3YQ8dfAjXcI1P4Tr1L+EG+Vu4iTv8CrfQ8erCPuZeV7iNRy/2x1YvnF6p5UHFockikzm/gple75KFrdLqnGtbxCZTg6BfSVOdaVvdU+zXQ+ciFVmTqgmrOkmMyq3Z6tAFG+fyUa8XiR6EJuVYY/62xgKOcQWFJQ6MMUIYZIjK6Og7VWb0r7FDwl57Vj3N53RbFNT/c4UBAvTPXFO6stJ5Ok+BPV8bUnV0K27LnpQ0kV7NSRKyQl7WtlRC6gE2ZVeOEXpc0Yk/KGdI/wAJWm7IAAAAeJxjYGKAAC4G7ICJkYmRmYE1JbMqI5OBAQANCAIzAAA=') format('woff'),
			url('https://at.alicdn.com/t/iconfont.ttf?t=1545902147596') format('truetype'),
			url('https://at.alicdn.com/t/iconfont.svg?t=1545902147596#iconfont') format('svg');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-dizhi:before {
		content: "\e652";
	}

	page {
		min-height: 100%;
		background-color: #f5f5f5;
	}

	#orderDetail {
		width: 100%;
		height: 100%;
	}

	.orderStatus {
		background: linear-gradient(to bottom ,#3598DC, #63B8FF);
		background-size: 100% 100%;
		width: 100%;
		height: 200upx;
		position: relative;
	}

	.orderStatusText {
		margin-left: 5%;
		color: #fff;
		height: 50upx;
		font-size: 30upx;
		line-height: 200upx;
	}

	.orderGoods {
		margin-top: 20upx;
		background: #fff;
	}

	.orderGoods-title {
		margin-left: 5%;
		font-size: 28upx;
		font-weight: bold;
		color: #585858;
		line-height: 80upx;
		border-bottom: 1px solid #f5f5f;
	}

	.orderAddress {
		display: flex;
		padding-bottom: 10upx;
		padding-top: 10upx;
		background: #fff;
	}

	.icon-dizhi {
		color: #3598dc;
		line-height: 100upx;
		font-size: 50upx;
		margin-left: 5%;
		margin-right: 20upx;
	}

	.orderAddress-main {
		width: 80%;
	}

	.orderAddress-main-name {
		font-size: 28upx;
		margin-right: 20upx;
	}

	.orderAddress-main-phone {
		font-size: 25upx;
		color: #a8a8a8;
	}

	.orderAddress-main-pos {
		font-size: 28upx;
	}

	.goods-list {
		width: 100%;
		margin-top: 20upx;
		background-color: #fff;
		border-bottom: 10upx solid #f5f5f5;
	}

	.goods-list .list-title {
		font-size: 28upx;
		color: #585858;
		font-weight: bold;
		margin-left: 5%;
		line-height: 80upx;
	}

	.goods-list .a-goods {
		width: 90%;
		margin-left: 5%;
		display: flex;
		/*justify-content: space-between;*/
		border-top: 1px solid #eee;
	}

	.goods-list .a-goods .img-box {
		width: 160upx;
		height: 160upx;
		overflow: hidden;
		margin-top: 20upx;
		margin-right: 20upx;
		background-color: #d8d8d8;
	}

	.goods-list .img-box .img {
		width: 160upx;
		height: 160upx;
	}

	.goods-list .a-goods .text-box {
		width: 510upx;
		box-sizing: border-box;
		padding-top: 10upx;
	}

	.a-goods .text-box .arow {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.a-goods .text-box .arow .goods-name {
		width: 360upx;
		font-size: 26upx;
		height: 74upx;
		color: #000;
		line-height: 1.6;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.a-goods .text-box .arow .goods-price {
		font-size: 26upx;
		color: #000;
		align-self: flex-start;
	}

	.a-goods .text-box .arow .goods-label {
		font-size: 26upx;
		margin-top: 30upx;
		width: 70%;
		color: #999;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.a-goods .text-box .arow .goods-num {
		font-size: 26upx;
		color: #999;
	}

	.orderPrice {
		width: 100%;
		font-size: 28upx;
		position: relative;
		line-height: 80upx;
	}

	.orderPrice-text {
		margin-left: 5%;
	}

	.orderPrice-num {
		position: absolute;
		top: 0upx;
		right: 5%;
	}

	.orderPayPrice {
		width: 100%;
		font-size: 28upx;
		position: relative;
		line-height: 80upx;
	}

	.orderPayPrice-text {
		border-top: 1upx solid #f5f5f5;
		margin-left: 5%;
	}

	.orderPayPrice-num {
		position: absolute;
		top: 0upx;
		right: 5%;
		color: #ef696c;
	}

	.orderMes {
		background: #fff;
		margin-top: 20upx;
	}

	.orderMes-title {
		font-size: 28upx;
		color: #585858;
		font-weight: bold;
		margin-left: 5%;
		line-height: 80upx;
		border-bottom: 1px solid #f5f5f5;
	}

	.orderNum {
		margin-left: 5%;
		display: flex;
		font-size: 28upx;
		border-bottom: 1px solid #f5f5f5;
		height: 70upx;
		line-height: 70upx;
		position: relative;
	}

	.orderNum-number {
		position: absolute;
		top: 0upx;
		right: 5%;
	}

	.orderTime {
		margin-left: 5%;
		display: flex;
		font-size: 28upx;
		height: 70upx;
		line-height: 70upx;
		border-bottom: 1px solid #f5f5f5;
		position: relative;
	}

	.orderTime-number {
		position: absolute;
		top: 0upx;
		right: 5%;
	}

	.orderPayWay {
		margin-left: 5%;
		display: flex;
		font-size: 28upx;
		height: 70upx;
		line-height: 70upx;
		border-bottom: 1px solid #f5f5f5;
		position: relative;
	}

	.orderPayWay-number {
		position: absolute;
		top: 0upx;
		right: 5%;
	}

	.orderWay {
		margin-left: 5%;
		display: flex;
		font-size: 28upx;
		height: 70upx;
		line-height: 70upx;
		border-bottom: 1px solid #f5f5f5;
		position: relative;
		margin-bottom: 120upx;
	}

	.orderPayWay-number {
		position: absolute;
		top: 0upx;
		right: 5%;
	}

	.barBottom {
		height: 90upx;
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #fff;
		border-top: 1upx solid #ddd;
	}

	.orderStatusBtn {
		position: absolute;
		right: 5%;
		top: 10upx;
		display: flex;
		font-size: 25upx;
		height: 70upx;
	}
	.orderStatusBtn button{
		margin-left: 10upx;
	}
	

	
</style>
