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
					<span class="color_959595 ">简介:</span>
					<span class="color_4a4a4a ">{{cleanerDetail.introduction}}</span>
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
		<view class="rule">点击查看<view style="color: #0081FF;" @tap="showModal" data-target="Modal">《人工估价规则》</view></view>
		<view class="btn">
			<view class="subBtn">
				<view>人工估价</view>
				<button class='service-kefu-btn' plain open-type="contact"></button>
			</view>
			<view class="subBtn" @tap="yuyue">立即预约</view>
		</view>
		
		
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">人工估价</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" style="font-size: 23upx;">
					【常规保洁】  每平方米1元<br>
					建筑面积：<br>
					赠送面积(标注阳台数量)：<br>
					油烟机表面深度清洁+25元<br>
					油烟机深度清洁+100元<br>
					马桶深度清洁消毒+20元<br>
					楼梯扶手每一层+8元<br>
					垃圾超过10斤+2元一斤<br><br>
					【深度保洁】   3元每平米<br>
					建筑面积：<br>
					赠送面积（标注阳台数量）：<br>
					窗户面积：每平米+10元<br>
					移门面积：每平米+8元<br>
					书房规划整理：每平米+20元<br>
					衣帽间规划整理：每平米+20元<br>
					垃圾超过10斤 +每斤2元<br>
					注：窗户超过3米以外外部分不在服务内。体量超过12平米，物件超过350件作为单独服务项目。<br><br>
					【新居开荒】  3.5元每平米<br>
					建筑面积：<br>
					赠送面积（注明阳台数量）：<br>
					窗户面积：+10元每平米<br>
					移门面积：+8元每平米<br>
					室内楼梯：+每一层8元<br>
					垃圾超过20斤 ： 每斤2元<br>
					厕所超过三个，超出部分+50一个<br><br>
					【办公室保洁】  1元每平方米<br>
					厕所：+50元一个
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { sendAjax } from '@/common/js/sendAjax.js';
import config from '@/apiConfig';
const {getCleanerDeail} = config.api;
export default {
	data() {
		return {
			modalName: null,
			data:[],
			cleanerDetail:[],
			sum:0
		};
	},
	methods: {
		onLoad: function(e) {
			console.log(e)
			this.data = JSON.parse(e.data)
			console.log(this.data)
			this.getCleanerDeail();
			this.calculation();
		},
		calculation(){
			var num = this.data.area;
			var cleanType = this.data.clearnType;
			var billingType = this.data.billingType;
			var unitPrice = 0;
			if(billingType == 1){
				if(cleanType == '常规保洁'){
					unitPrice = 1.5;
				}else if(cleanType == '深度保洁'){
					unitPrice = 5;
				}else if(cleanType == '新居开荒'){
					unitPrice = 7;
				}else if(cleanType == '办公室店面保洁'){
					unitPrice = 1.5
				}
			}else{
				if(cleanType == '常规保洁'){
					unitPrice = 40;
				}else if(cleanType == '深度保洁'){
					unitPrice = 55;
				}else if(cleanType == '新居开荒'){
					unitPrice = 65;
				}else if(cleanType == '办公室店面保洁'){
					unitPrice = 40
				}
			}
			
			this.sum = num * unitPrice; 
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
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target
		},
		hideModal(e) {
			this.modalName = null
		},
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
.btn{
	display: flex;
}
.subBtn {
	position: relative;
	background: #3598dc;
	width: 47%;
	height: 84upx;
	margin: 20upx auto;
	margin-right: 1%;
	color: #ffffff;
	line-height: 84upx;
	font-size: 28upx;
	text-align: center;
}
.service-kefu-btn{
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: #fff;
	text-align: left;
	font-size: 28upx;
	z-index: 999;

}
button[plain] {
  color:#6D6C6B;
  
padding-left:0;
border:none;
background-color:transparent;

}
.rule{
	display: flex;
	width: 100%;
	text-align: center;
	margin: auto;
	font-size: 25upx;
	justify-content: center;
}
</style>
