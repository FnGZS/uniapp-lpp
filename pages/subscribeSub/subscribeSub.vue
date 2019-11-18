<template>
	<view>
		<scroll-view scroll-x class="bg-white response cu-steps steps-bottom" :scroll-into-view="'scroll-' + scroll" scroll-with-animation>
			<view class="cu-item padding-lr-xl font_24" :class="index > scroll ? '' : 'text-blue'" v-for="(item, index) in basicsList" :key="index" :id="'scroll-' + index">
				<text class="num" :data-index="index + 1"></text>
				{{ item.name }}
			</view>
		</scroll-view>
		<view class="subImg" @tap="chooseImage">
			<image v-if="img == ''" src="/static/img/camBg.jpg" mode=""></image>
			<image v-if="img != ''" :src="img" mode=""></image>
		</view>
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
					<input type="text" value="" placeholder='请填写姓名' :value="name" @input='input_name'/>
				</view>
			</view>
			<view class="subFormInfo">
				<view class="subFormInfoLeft">联系电话</view>
				<view class="columnLine"></view>
				<view class="subFormInfoRight">
					<input type="text" value="" placeholder="请填写手机号" :value="phone" @input='input_phone'/>
				</view>
			</view>
			<view class="subFormInfo">
				<view class="subFormInfoLeft">家庭住址</view>
				<view class="columnLine"></view>
				<view class="subFormInfoRight">
					<input type="text" value="" placeholder="请输入地址" :value="address" @input='input_address'/>
					<!-- <view class="cuIcon-right"></view> -->
				</view>
			</view>
			<view class="subFormInfo">
				<view class="subFormInfoLeft">房屋面积</view>
				<view class="columnLine"></view>
				<view class="subFormInfoRight">
					<input type="text" value="" placeholder="请填写房屋面积"  :value="area" @input='input_area'/>
					
						<view class="cu-capsule radius" style="position: absolute;right: 0;top:0;">
							<view class='cu-tag bg-blue '>
								平方米(㎡)
							</view>
						</view>
						
				</view>
			</view>
		</view>
		<view class="subFormRemark">
			<view class="subFormInfoLeft">备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注</view>
			<textarea value="" placeholder="填写备注"  :value="remark" @input='input_remark'/>
		</view>
		<view class="sub" v-on:click.stop="submit">提交</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			clearnerId:null,
			customerId:null,
			img:'',
			name:'',
			phone:'',
			address:'',
			area:'',
			remark:'',
			appointmentTime:'',
			appointmentType:'',
			basicsList: [{name: '预约时间'},{name: '完善信息'},{name: '估价'}],
			// 0 预约时间 1 预约时间+完善信息 2  预约时间+完善信息+提交
			scroll: 1,
			radio: '1',
			cleanType:''
		};
	},
	methods: {
		onLoad: function(e) {
			this.clearnerId = e.id;
			this.appointmentType = e.type;
			this.appointmentTime = e.day;
			this.cleanType = e.cleanType;
			this.customerId = uni.getStorageSync('userInfo').openId;
		},
		chooseImage() {
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: (res) => {
						this.img = res.tempFilePaths
				}
			});
		},
		input_name(e){
			this.name = e.detail.value
		},
		input_phone(e){
			this.phone = e.detail.value
		},
		input_address(e){
			this.address = e.detail.value
		},
		input_area(e){
			console.log(e)
			this.area = e.detail.value
		},
		input_remark(e){
			console.log(e);
			this.remark = e.detail.value
		},
		
		RadioChange(e) {
			this.radio = e.detail.value;
		},
		//下一页
		submit(){
			if(this.img == ''){
				uni.showToast({title:'请选择图片',icon:'none'})
			}else if(this.name == ''){
				uni.showToast({title:'请输入名字',icon:'none'})
			}else if(this.phone == ''){
				uni.showToast({title:'请输入联系电话',icon:'none'})
			}else if(this.address == ''){
				uni.showToast({title:'请输入家庭地址',icon:'none'})
			}else if(this.area == ''){
				uni.showToast({title:'请输入房屋面积',icon:'none'})
			}
			else{
				var data = {
					clearnerId:this.clearnerId,
					customerId:this.customerId,
					img:this.img,
					billingType:this.scroll,
					name:this.name,
					phone:this.phone,
					address:this.address,
					area:this.area,
					remark:this.remark,
					appointmentTime:this.appointmentTime,
					appointmentType:this.appointmentType,
					cleanType:this.cleanType
				}
				 uni.navigateTo({
					url:'../orderSub/orderSub?data=' + JSON.stringify(data)
				 })
			}
			
		}
	}
};
</script>

<style>
/* 步骤条 */
.cu-steps {
	padding: 0upx 0upx 20upx 85upx;
	margin-bottom: 10upx;
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
.subFormInfoRight {
	position: relative;
}
.subFormInfoRight input{
	width: 450upx;
	margin-left: 20upx;
}
.cuIcon-right{
	position: absolute;
	right:0;
	top:20upx;
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
.sub{
	z-index: 999;
}
</style>
