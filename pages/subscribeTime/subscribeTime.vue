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
				<view class="subPeople-name">张某某</view>
				<view class="subPeople-detail">柯桥区 | 1-3年 | XXX</view>
				<view class="subPeople-skill">
					<view class="subPeople-skill-main">办公室店面保洁</view>
					<view class="subPeople-skill-main">甲醛治理</view>
				</view>
				<view class="subPeople-label"><view class="cuIcon-message">咨询</view></view>
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
							<span>{{ item.week }}</span>
							<span>{{ item.date }}</span>
						</td>
					</tr>
					<tr>
						<td class="font_28">上午</td>
						<td v-for="(item, index) in dataList" :key="index"><view :class="item.status ? 'subPeopleTimeTableYuYue' : 'subPeopleTimeTableNoYuYue'">预约</view></td>
					</tr>
					<tr>
						<td class="font_28">下午</td>
						<td v-for="(item, index) in dataList" :key="index"><view :class="item.status ? 'subPeopleTimeTableYuYue' : 'subPeopleTimeTableNoYuYue'">预约</view></td>
					</tr>
				</tbody>
			</table>
		</view>
		<view class="subPeopleInfo">
			<view class="public-title">
				<view class="public-leftLine"></view>
				<view class="public-box color_5a6c81 font_29">简介</view>
			</view>
			<view class="subPeopleInfoText">撒打发士大夫</view>
		</view>
		<view class="sub" @click="toSub">下一步</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			basicsList: [
				{
					name: '预约时间'
				},
				{
					name: '完善信息'
				},
				{
					name: '提交'
				}
			],
			// 0 预约时间 1 预约时间+完善信息 2  预约时间+完善信息+提交
			scroll: 0,
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
</style>
