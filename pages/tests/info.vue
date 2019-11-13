<template>
	<view>
		<view class="box" v-for="(item, index) in testList" :key="index">
			<view class="title">{{index+1}}.{{ item.title }}</view>
			<view class="content">
				<radio-group class="block" @change="RadioChange" :data-index = "index" :data-answer="item.answer">
					<view v-for="(item, index) in item.content" key="index">
						<radio class="azure radio" :value="index"></radio>
						<text class="block_text">{{index}}:{{item}}</text>
					</view>
				</radio-group>
			</view>
		</view>
		<button class="sub_btn" type="primary" @click="sub">提交</button>
	</view>
</template>

<script>
import { sendAjax } from '@/common/js/sendAjax.js';
import config from '@/apiConfig';
const { getTestList, submit } = config.api;
export default {
	data() {
		return {
			testList: [],
			dataList:[]
		};
	},
	onLoad() {
		this.getTest();
	},
	methods: {
		getTest() {
			var that = this;
			let infoOpt = {
				url: getTestList,
				type: 'POST',
				data: {
					id: '',
					title: '',
					pageNum: 1,
					pageSize: 999
				}
			};
			let infoCb = {};
			infoCb.success = function(res) {
				console.log(res.list);
				res.list.forEach(res => {
					res.content = JSON.parse(res.content);
				});
				that.testList = res.list;
			};
			sendAjax(infoOpt, infoCb);
		},
		RadioChange(e) {
			this.dataList[e.target.dataset.index] = {
				value:e.detail.value,
				answer:e.target.dataset.answer
			}
		},
		sub(){
			let that = this
			let newList = []
			
			that.dataList.forEach(res=>{
				newList.push(res)
			})
			// console.log(newList)
			if(newList.length!=that.testList.length){
				uni.showModal({
					title: '提示',
					content: '您还有题未答，请继续答题！',
					showCancel: false
				});
			}else{
				console.log(that.dataList)
				let d = 0
				let c = 0
				that.dataList.forEach(res=>{
					if(res.value==res.answer){
						d++
					}else{
						c++
					}
				})
				console.log(d,c)
				if(d/(that.dataList.length)>=0.8){
					let infoOpt = {
						url: submit,
						type: 'POST',
						data: {
							id: uni.getStorageSync('userInfo').userDetail.id,
							state: true,
						}
					};
					let infoCb = {};
					infoCb.success = function(res) {
						uni.showModal({
							title: '恭喜',
							content: '恭喜你通过考核！',
							showCancel: false
						});
					};
					sendAjax(infoOpt, infoCb);
				}else{
					uni.showModal({
						title: '遗憾',
						content: '很遗憾你未通过考核！',
						showCancel: false
					});
				}
			}
			
		}
	}
};
</script>

<style scoped="true" lang="scss">
.box {
	width: 710upx;
	margin: 20upx auto;
	position: relative;
	padding:20upx;
	background:#fff;
	border-radius:10upx;
	.title{
		width: 100%;
		heigth:100upx;
		line-height: 100upx;
		font-size: 28upx;
		color: #4a4a4a;
		font-weight: 700;
		margin-left: 10upx;
	}
	.radio{
		margin: 4upx 20upx 4upx 0;
	}
}
.sub_btn{
	width: 710upx;
	margin: 0upx auto 20upx;
	height: 80upx;
	line-height: 80upx;
	font-size: 30upx;
	background: #3598dc;
}
</style>
