<template>
	<view id="paiban">
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
							<span>{{ item.workTime}}</span>
							<span>{{ item.workDate.substring(5,10) }}</span>
						</td>
					</tr>
					<tr>
						<td class="font_28">上午</td>
						<td v-for="(item, index) in dataList" :key="index">
							<view  class="subPeopleTimeTableYuYue " :data-type="'mor'" :data-data="item.workDate"  @click="paiban" data-target="DialogModal1">排班</view>
							<view  class="subPeopleTimeTableNoYuYue " data-type="'mor'" :data-data="item.workDate"  @click="paiban" data-target="DialogModal1">排班</view>
						</td>
					</tr>
					<tr>
						<td class="font_28">下午</td>
						<td v-for="(item, index) in dataList" :key="index">
							<view  class="subPeopleTimeTableYuYue" :data-type="'aft'" :data-data="item.workDate" @click="paiban" data-target="DialogModal1">排班</view>
							<view  class="subPeopleTimeTableNoYuYue" :data-type="'aft'" :data-data="item.workDate" @click="paiban" data-target="DialogModal1">排班</view>
						</td>
					</tr>
				</tbody>
			</table>
		</view>
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">排班信息</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					选择排班？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="cancel">取消排班</button>
						<button class="cu-btn bg-green margin-left" @tap="confirm">确认排班</button>
					</view>
				</view>
			</view>
		</view>
		<view class="subPeopleInfo">
			<view class="public-title">
				<view class="public-leftLine"></view>
				<view class="public-box color_5a6c81 font_29">提示</view>
			</view>
			<view class="subPeopleInfoText">
				1、默认为没有时间；<br>
				2、点击可以设置是否有时间进行排班。
			</view>
		</view>
	</view>
</template>

<script>
	import {
		sendAjax
	} from '@/common/js/sendAjax.js';
	import config from '@/apiConfig';
	const {getCleanerWork,setCleanerWork} = config.api;
	export default {
		data() {
			return {
				modalName:null,
				id: null,
				basicsList: [{
					name: '预约时间'
				}, {
					name: '完善信息'
				}, {
					name: '估价'
				}],
				// 0 预约时间 1 预约时间+完善信息 2  预约时间+完善信息+提交
				scroll: 0,
				detail: '',
				chooseType: '',
				chooseData: '',
				dataList: [],
				yuyueList: {}
			};
		},
		methods: {
			onLoad: function(e) {
				this.id = uni.getStorageSync('userDetail').cleaner.id;
				
				this.getWorkTime();
				this.getCleanerWork();
			},
			paiban(e){
				console.log('排班')
				this.modalName = e.currentTarget.dataset.target;
				this.chooseType = e.currentTarget.dataset.type;
				this.chooseData = e.currentTarget.dataset.data;
				console.log(this.chooseType)
				console.log(this.chooseData)
				
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
					var workList = res;
					for(var i in workList){
						workList[i].workDate = workList[i].workDate.substring(5,10)
					}
					var yuyueList = {}
					for(var i in workList){
						yuyueList[workList[i].workDate] = workList[i].statusMor.toString() + workList[i].statusAft.toString()
					}
					console.log(yuyueList)
					that.yuyueList = yuyueList
					console.log(yuyueList['12-12'])
					uni.hideLoading()
				},
				infoCb.beforeSend = () => {
				  uni.showLoading({
				  	title:'加载中'
				  })
				};
				sendAjax(infoOpt, infoCb);
			},
			cancel(){
				var type = this.chooseType;
				var work_date = this.chooseData;
				if(type == 'mor'){
					var status_mor = 0;
				}else{
					var status_aft = 0;
				}
				var data = {
					id:this.id,
					work_date:work_date,
					type:type
				}
			},
			confirm(){
				var type = this.chooseType;
				var work_date = this.chooseData;
				// if(type == 'mor'){
				// 	status_mor = 1;
				// }else{
				// 	status_aft = 1;
				// }
				var that = this;
				let infoOpt = {
					url: setCleanerWork,
					type: 'POST',
					data: {
						cid:this.id,
						workDate:work_date,
						type:type
					}
				};
				let infoCb = {};
				infoCb.success = function(res) {
					console.log(res)
					uni.hideLoading()
				},
				infoCb.beforeSend = () => {
				  uni.showLoading({
				  	title:'加载中'
				  })
				};
				sendAjax(infoOpt, infoCb);
			},
			hideModal(e) {
				this.modalName = null
			},
			getWorkTime() {
				var arr = []
				for (let i = 0; i < 7; i++) {
					arr.push(this.dealTime(i))
				}
				console.log(arr)
				this.dataList = arr;
			},
			// 处理未来七天的函数
			dealTime: function(num) { // num：未来天数
				var time = new Date() // 获取当前时间日期
				var date = new Date(time.setDate(time.getDate() + num + 1)).getDate() //这里先获取日期，在按需求设置日期，最后获取需要的
				if (date < 10) date = '0' + date;
				var year = time.getFullYear();
				var month = time.getMonth() + 1 // 获取月份
				var day = time.getDay() //  获取星期
				switch (day) { //  格式化
					case 0:
						day = "周日"
						break
					case 1:
						day = "周一"
						break
					case 2:
						day = "周二"
						break
					case 3:
						day = "周三"
						break
					case 4:
						day = "周四"
						break
					case 5:
						day = "周五"
						break
					case 6:
						day = "周六"
						break
				}
				var obj = {
					workDate:year + '-' + month + '-' + date,
					workTime: day,
					statusMor: 0,
					statusAft: 0
				}
				return obj // 返回对象
			},
			
			showModal(e) {
				
			}
		}
	};
</script>

<style>

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

	.subPeopleTimeTable tr>td {
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

	.choose {
		border: 5upx solid red;
	}
</style>
