<template>
	<view>
		<view class="orderBox">
			<image src="../../static/img/gujia.png" mode=""></image>
			<view class="orderTop">
				<view class="orderTopText">
					<span class="color_959595">业主:</span>
					<span class="color_4a4a4a">{{data.name}}</span>
				</view>
				<view class="orderTopText">
					<span class="color_959595">地址:</span>
					<span class="color_4a4a4a">{{data.address}}</span>
				</view>
				<view class="orderTopText lastText">
					<span class="color_959595">预约时间:</span>
					<span class="color_4a4a4a">{{data.appointmentTime}}{{data.appointmentType}}</span>
				</view>
			</view>
			<view class="orderBottom">
				<view class="orderBottomText">
					<span class="color_959595">姓名:</span>
					<span class="color_4a4a4a">{{cleanerDetail.name}}</span>
				</view>
				<view class="orderBottomText">
					<span class="color_959595">电话:</span>
					<span class="color_4a4a4a">{{cleanerDetail.telephone}}</span>
				</view>
				<view class="orderBottomText lastText">
					<span class="color_959595 font_22">简介:</span>
					<span class="color_4a4a4a font_22">{{cleanerDetail.introduction}}</span>
				</view>
			</view>
		</view>
		<view class="orderMoney">
			<span class="font_40 color_959595">估价：</span>
			<span class="font_40 color_959595">￥{{sum}}</span>
		</view>
		<!-- <view class="orderDingMoney"><span class="font_30 color_959595">x0.1</span></view> -->
		<!-- <view class="orderDingMoney">
			<span class="font_30">定金：</span>
			<span class="font_30 color_red">￥888</span>
		</view> -->
		<view class="subBtn">立即预约</view>
	</view>
</template>

<script>
import { sendAjax } from '@/common/js/sendAjax.js';
import config from '@/apiConfig';
const {getCleanerDeail} = config.api;
export default {
	data() {
		return {
			data:[],
			cleanerDetail:[],
			sum:0
		};
	},
	methods: {
		onLoad: function(e) {
			this.data = JSON.parse(e.data)
			console.log(this.data)
			this.getCleanerDeail();
			this.calculation();
		},
		calculation(){
			var num = this.data.area;
			this.sum = num * 100; 
		},
		getCleanerDeail(){
			var that = this;
			console.log(this.data.clearnerId)
			let infoOpt = {
				url: getCleanerDeail,
				type: 'POST',
				data: {
					id:this.data.clearnerId
				}
			};
			let infoCb = {};
			infoCb.success = function(res) {
				console.log(res)
				that.cleanerDetail = res;
				uni.hideLoading()
			},
			infoCb.beforeSend = () => {
			  uni.showLoading({
			  	title:'加载中'
			  })
			};
			sendAjax(infoOpt, infoCb);
		},
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
