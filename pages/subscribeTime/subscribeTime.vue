<template>
	<view>
		<scroll-view scroll-x class="bg-white response cu-steps steps-bottom" :scroll-into-view="'scroll-' + scroll" scroll-with-animation>
			<view class="cu-item padding-lr-xl" :class="index > scroll ? '' : 'text-blue'" v-for="(item, index) in basicsList" :key="index" :id="'scroll-' + index">
				<text class="num" :data-index="index + 1"></text>
				{{ item.name }}
			</view>
		</scroll-view>
		<view class="subPeople">
			<image src="https://www.sxscott.com/img/c.png"></image>
			<view class="subPeople-info">
				<view class="subPeople-name">{{detail.name}}</view>
				<view class="subPeople-detail">{{detail.place}} | {{detail.work}}年 </view>
				<view class="subPeople-skill">
					<view class="subPeople-skill-main">{{detail.card}}</view>
					<!-- <view class="subPeople-skill-main">甲醛治理</view> -->
				</view>
				<view class="subPeople-label"><view class="iconfont icon-dianhua" :data-phone='detail.telephone' @tap='phone'>咨询</view></view>
			</view>
		</view>
		<view class="subPeopleTime">
			<view class="public-title">
				<view class="public-leftLine"></view>
				<view class="public-box color_5a6c81 font_29">排班</view>
			</view>
			<table class="subPeopleTimeTable">
				<tbody>
					<tr>
						<td></td>
						<td v-for="(item, index) in dataList" :key="index">
							<span>{{ item.workTime }}</span>
							<span>{{ item.workDate }}</span>
						</td>
					</tr>
					<tr>
						<td class="font_28">上午</td>
						<td v-for="(item, index) in dataList" :key="index">
							<view v-if="item.status == 2" class="subPeopleTimeTableNoYuYue" :class="chooseType=='mor'&&chooseData==item.workDate ?'choose':''">预约</view>
							<view v-if="item.status == 1" class="subPeopleTimeTableYuYue">预约</view>
						</td>
					</tr>
					<tr>
						<td class="font_28">下午</td>	
						<td v-for="(item, index) in dataList" :key="index">
							<view v-if="item.status == 0" class="subPeopleTimeTableNoYuYue" :class="chooseType=='aft'&&chooseData==item.workDate ?'choose':''">预约</view>
							<view v-if="item.status == 1" class="subPeopleTimeTableYuYue">预约</view>
						</td>
					</tr>
				</tbody>
			</table>
		</view>
		<view class="subPeopleInfo">
			<view class="public-title">
				<view class="public-leftLine"></view>
				<view class="public-box color_5a6c81 font_29">简介</view>
			</view>
			<view class="subPeopleInfoText">{{detail.introduction}}</view>
		</view>
		<view class="sub" @click="toSub">下一步</view>
	</view>
</template>

<script>
	import { sendAjax } from '@/common/js/sendAjax.js';
	import config from '@/apiConfig';
	const {getCleanerDeail,getCleanerWork} = config.api;
export default {
	data() {
		return {
			id:null,
			basicsList: [{name: '预约时间'},{name: '完善信息'},{name: '提交'}],
			// 0 预约时间 1 预约时间+完善信息 2  预约时间+完善信息+提交
			scroll: 0,
			detail:'',
			chooseType:'mor',
			chooseData:'10.27',
			dataList: [
				{
					week: '周二',
					date: '07-01',
					status: 1
				},
				{
					week: '周三',
					date: '07-02',
					status: 1
				},
				{
					week: '周四',
					date: '07-03',
					status: 1
				},
				{
					week: '周五',
					date: '07-04',
					status: 1
				},
				{
					week: '周六',
					date: '07-05',
					status: 1
				},
				{
					week: '周日',
					date: '07-06',
					status: 0
				},
				{
					week: '周一',
					date: '07-07',
					status: 1
				}
			]
		};
	},
	methods: {
		onLoad: function(e) {
			console.log(e)
			this.id = e.id;
			this.getCleanerDeail();
			this.getCleanerWork();
		},
		getCleanerDeail(){
			var that = this;
			let infoOpt = {
				url: getCleanerDeail,
				type: 'POST',
				data: {
					id:this.id
				}
			};
			let infoCb = {};
			infoCb.success = function(res) {
				console.log(res)
				that.detail = res;
				uni.hideLoading()
			},
			infoCb.beforeSend = () => {
			  uni.showLoading({
			  	title:'加载中'
			  })
			};
			sendAjax(infoOpt, infoCb);
		},
		getCleanerWork(){
			var that = this;
			let infoOpt = {
				url: getCleanerWork,
				type: 'POST',
				data: {
					cleanerId:this.id
				}
			};
			let infoCb = {};
			infoCb.success = function(res) {
				console.log(res)
				var workList = res;
				for(var i in workList){
					workList[i].workDate = workList[i].workDate.substring(5,11)
				}
				that.dataList = workList;
				console.log(workList)
				uni.hideLoading()
			},
			infoCb.beforeSend = () => {
			  uni.showLoading({
			  	title:'加载中'
			  })
			};
			sendAjax(infoOpt, infoCb);
		},
		//拨打电话
		phone(e){
			console.log(e)
			uni.makePhoneCall({
			  phoneNumber: e.currentTarget.dataset.phone
			})
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
	@font-face {font-family: "iconfont";
	  src: url('https://at.alicdn.com/t/iconfont.eot?t=1566039818041'); /* IE9 */
	  src: url('https://at.alicdn.com/t/iconfont.eot?t=1566039818041#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALoAAsAAAAABrAAAAKZAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqBFIEcATYCJAMMCwgABCAFhG0HPBvoBciemjwpEctEiELim4f5ABNFEO33Ont3IQBJkn2+CpKKEbFRbY0kodjoCsO6te9Q1w4v7sHsbUR9Uqkkbd/y5POoTMz4arazwgij+U6a845Vja7Pczm9CXQg82OU4142xn5+1AswDiigvTHawmWSiDeMXeASzhNoNq6Y135jexcICmtaIJ50VQQhF1MUVmwU6mvWFvFancb0ku4BvAq/H3/BEgJJXWbNrT02KFD9I5Q5L1VLzn1CnAA31yFjFSjEZW3umI9gnI9mi297db0ipLmSVUWo0U319h8eSRD1rMZWsIjyiR+hria1mqHurgsZ7k6VOWCT7e0fYrJu8PGxu3f7ONafv3GaCDsn2X8G9s/zgg/fQvGNmzsx00QJDP+fdnigrdtsZ5u3ncmDEPe+XNSd1e6Elxchv5vtD9Uf42BwpLO8/wzWa0tdnfYvwBlcA1R3+VwOqqXc47MkELyZPpgbDS//JwQX8H0BgsI11VKB/IxGid7an6bt2VJ0veXNRdW4GjOQTfbIJjTrQRVYoW5f4x19N1YKjfpGhBqM3WSg0WxKFnYVdVqsoV6jLTRb0bS5RQ/GR5QmLFsHCJ2ukbT7hqzTA1nYT9Tp9496neGDZocRvWeL+dCD6hgWOVaQNI10mTqJ4+dBUXMHVj12kWX1Id+DmVtPIrPBVCw2YSdmcyxwT6gWzgkijDpQI7gM2+0UuRi1YpkbNM5dpUYjqbuRQaYOCLKHwUQcpkAk0xCdjHIifmcuqPT5DpjKw07EWhQ19R4Y46b3jpgZmHqQTRZnL8W9XOM2QWXBcQRCMJQD0ghGYXZ2FOKqH2WFyTgDbUTGpZTRbkf6Wgzr2xzftwuaWQfmSJGjaLjXRafmEQVJF+l46gYAAAAA') format('woff2'),
	  url('https://at.alicdn.com/t/iconfont.woff?t=1566039818041') format('woff'),
	  url('https://at.alicdn.com/t/iconfont.ttf?t=1566039818041') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	  url('https://at.alicdn.com/t/iconfont.svg?t=1566039818041#iconfont') format('svg'); /* iOS 4.1- */
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-dianhua:before {
	  content: "\e631";
	}
/* 步骤条 */
.cu-steps {
	padding: 0upx 0upx 20upx 85upx;
	margin-top: 10upx;
}
.text-blue,
.line-blue,
.lines-blue {
	color: #3598dc;
}
.cu-steps .cu-item .num {
	border: 1upx solid #3598dc;
	color: #3598dc;
}
.cu-steps .cu-item[class*='text-'] .num {
	background-color: #3598dc;
}
/* 咨询 */
.subPeople {
	display: flex;
	position: relative;
	width: 100%;
	height: 277upx;
	background: #fff;
	margin: 10upx 0;
}
.subPeople image {
	margin: 35upx 10upx 35upx 35upx;
	width: 200upx;
	height: 200upx;
}
.subPeople-name {
	color: #3c3c3c;
	margin-top: 50upx;
	margin-left: 20upx;
	font-size: 33upx;
	font-weight: bold;
}
.subPeople-detail {
	color: #919191;
	margin-top: 10upx;
	margin-left: 20upx;
	font-size: 28upx;
}
.subPeople-skill {
	display: flex;
}
.subPeople-skill-main {
	margin-top: 20upx;
	margin-left: 20upx;
	padding: 5upx 10upx;
	font-size: 25upx;
	border: 2upx solid #e7e6ec;
	border-radius: 10upx;
	color: #c1c1c1;
}
.subPeople-label {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 50upx;
	right: 30upx;
	font-size: 26upx;
	color: #fff;
	width: 140upx;
	height: 56upx;
	background: #3598dc;
	border-radius: 20upx;
	opacity: 0.7;
}

/* 时间表 */
.subPeopleTime {
	width: 100%;
	height: 410upx;
	background: #fff;
	padding-bottom: 10upx;
	margin-bottom: 10upx;
}
.subPeopleTimeTable {
	width: 706upx;
	height: 288upx;
	border: 2upx solid #cef3eb;
	margin: 0 auto;
	background: #e7e7e7;
	overflow: hidden;
	border-radius: 10upx;
}
.subPeopleTimeTable tbody {
	display: flex;
	flex-direction: column;
}
.subPeopleTimeTable tr {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.subPeopleTimeTable tr > td {
	color: #7d7d7d;
}
.subPeopleTimeTable td {
	width: 87.5upx;
	background: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.subPeopleTimeTable tr:nth-child(1) {
	height: 99upx;
	margin-bottom: 1upx;
	font-size: 21upx;
	line-height: 40upx;
}
.subPeopleTimeTable tr:nth-child(2),
.subPeopleTimeTable tr:nth-child(3) {
	height: 92upx;
	margin-bottom: 1upx;
}
.subPeopleTimeTableYuYue,
.subPeopleTimeTableNoYuYue {
	background: #3598dc;
	width: 71upx;
	height: 67upx;
	opacity: 0.8;
	border-radius: 6upx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 21upx;
}
.subPeopleTimeTableNoYuYue {
	background: #d7d7d7;
}
/* 简介 */
.subPeopleInfo {
	width: 100%;
	background: #fff;
}
.subPeopleInfoText {
	padding: 0 30upx 30upx;
	font-size: 26upx;
	color: #4a4a4a;
	margin-bottom: 200upx;
}
.choose{
	border: 1upx solid red;
}
</style>
