<template>
	<view>
		<scroll-view scroll-x class="bg-white response cu-steps steps-bottom" :scroll-into-view="'scroll-' + scroll" scroll-with-animation>
			<view class="cu-item padding-lr-xl font_24" :class="index > scroll ? '' : 'text-blue'" v-for="(item, index) in basicsList" :key="index" :id="'scroll-' + index">
				<text class="num" :data-index="index + 1"></text>
				{{ item.name }}
			</view>
		</scroll-view>
		<view class="subImg"><image src="/static/img/camBg.jpg" mode=""></image></view>
		<view class="subForm">
			<view class="subFormInfo">
				<view class="subFormInfoLeft">计费方式</view>
				<view class="columnLine"></view>
				<view class="subFormInfoRight">
					<radio-group class="block" @change="RadioChange">
						<radio class="azure radio" :class="radio == '1' ? 'checked' : ''" :checked="radio == '1' ? true : false" value="1"></radio>
						<text>按平方</text>
						<radio class="azure radio" :class="radio == '2' ? 'checked' : ''" :checked="radio == '2' ? true : false" value="2"></radio>
						<text>按小时</text>
					</radio-group>
				</view>
			</view>
			<view class="subFormInfo">
				<view class="subFormInfoLeft">姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名</view>
				<view class="columnLine"></view>
				<view class="subFormInfoRight">
					<input type="text" value="" placeholder='请填写姓名'/>
				</view>
			</view>
			<view class="subFormInfo">
				<view class="subFormInfoLeft">联系电话</view>
				<view class="columnLine"></view>
				<view class="subFormInfoRight">
					<input type="text" value="" placeholder="请填写手机号"/>
				</view>
			</view>
			<view class="subFormInfo">
				<view class="subFormInfoLeft">家庭住址</view>
				<view class="columnLine"></view>
				<view class="subFormInfoRight">
					<input type="text" value="" placeholder="请填写家庭住址"/>
				</view>
			</view>
			<view class="subFormInfo">
				<view class="subFormInfoLeft">房屋面积</view>
				<view class="columnLine"></view>
				<view class="subFormInfoRight">
					<input type="text" value="" placeholder="请填写房屋面积"/>
				</view>
			</view>
		</view>
		<view class="subFormRemark">
			<view class="subFormInfoLeft">备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注</view>
			<textarea value="" placeholder="填写备注" />
		</view>
		<view class="sub">下一步</view>
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
			scroll: 1,
			radio: '1'
		};
	},
	onLoad(){
	},
	methods: {
		RadioChange(e) {
			this.radio = e.detail.value;
		}
	}
};
</script>

<style>
/* 步骤条 */
.cu-steps {
	padding: 0upx 0upx 20upx 85upx;
	margin-bottom: 10upx;
}
.text-blue,
.line-blue,
.lines-blue {
	color: #09c499;
}
.cu-steps .cu-item .num {
	border: 1upx solid #09c499;
	color: #09c499;
}
.cu-steps .cu-item[class*='text-'] .num {
	background-color: #09c499;
}
radio {
	transform: scale(0.6);
}

.subImg {
	width: 100%;
	height: 400upx;
}
.subImg image {
	width: 100%;
	height: 100%;
}
.subForm {
	width: 703upx;
	height: 520upx;
	margin: 24upx auto;
	background: #fff;
	overflow: hidden;
}
.subFormInfo {
	width: 100%;
	height: 105upx;
	border-bottom: 1upx solid #f5f5f5;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.subFormInfoLeft {
	width: 200upx;
	height: 105upx;
	line-height: 105upx;
	text-align: center;
	color: #333;
	font-size: 30upx;
	font-weight: 700;
}
.columnLine {
	width: 4upx;
	height: 34upx;
	background: #ccc;
}
.columnLine radio-group {
	display: flex;
	flex-direction: row;
}
.azure {
	margin-left: 50upx;
}
.block{
	height: 105upx;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	color: #4a4a4a;
	font-size: 28upx;
}
.subFormInfoRight input{
	width: 450upx;
	margin-left: 20upx;
}
/* 备注 */
.subFormRemark{
	width: 703upx;
	min-height: 300upx;
	background: #fff;
	margin: 0 auto 200upx;
	display: flex;
	flex-direction: column;
}
.subFormRemark textarea{
	margin: 10upx 45upx;
}
</style>
