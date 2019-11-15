<template>
	<view>
		<view class="box" v-for="(item, index) in testList" :key="index">
			<view class="title font_30">{{index+1}}.{{ item.title }}</view>
			<view class="padding-top-sm">
				<checkbox-group class="block" @change="CheckboxChange" :data-index = "index" :data-answer="item.answer">
					<view class="padding-top-sm padding-bottom-xs content" v-for="(item, index) in item.content" key="index">
						<checkbox class="margin-left-xs margin-right-sm" :checked="checkBox?'':false" :value="index"></checkbox>
						<view class="block_text font_26">{{index}}:{{item}}</view>
					</view>
				</checkbox-group>
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
			dataList:[],
			//清空选择框
			checkBox:true
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
		CheckboxChange(e) {
			this.checkBox = true
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
			if(newList.length!=that.testList.length){
				uni.showModal({
					title: '提示',
					content: `您还有${that.testList.length-newList.length}题未答，请继续答题！`,
					showCancel: false
				});
			}else{
				let d = 0
				let c = 0
				that.dataList.forEach(res=>{
					if(JSON.stringify(res.value)===res.answer){
						d++
					}else{
						c++
					}
				})
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
						content: `很遗憾您答错${c}题，未通过考核！`,
						showCancel: false,
						complete: function (res) {
							console.log(res)
						        if (res.confirm) {
						            console.log('用户点击确定');
									that.checkBox = false
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }

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
		width: 95%;
		color: #4a4a4a;
		font-weight: 700;
		margin-left: 10upx;
		line-height: 50upx;
	}
	.content{
		border-bottom: 1upx solid #eee;
		display:flex;
	}
	.block_text{
		width: 85%;
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
