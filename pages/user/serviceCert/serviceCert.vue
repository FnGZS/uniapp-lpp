<template>
	<view id='serviceCert'>
		<form>
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input placeholder="请输入姓名" name="input" @input="getName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<switch class='switch-sex' @change="SwitchSex" :class="switchSex?'checked':''" :checked="switchSex?true:false"></switch>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="请输入手机号" name="input" @input="getPhone"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<!-- <view class="cu-tag line-blue">
	 			中国大陆
	 		</view> -->
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input placeholder="请输入验证码" name="input" @input="getYzm"></input>
				<button class='cu-btn bg-green' @tap="getCode" :disabled="disabled">
					 {{countdown}} <text v-show="timestatus">秒重获</text>
				</button>
			</view>
			<view class="cu-form-group">
				<view class="title">服务范围</view>
				<picker mode="region" @change="RegionChange" :value="region">
					<view class="picker">
						{{region[0]}}，{{region[1]}}，{{region[2]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">工作经验</view>
				<picker @change="PickerChange" :value="pickerIndex" :range="picker">
					<view class="picker">
						{{pickerIndex>-1?picker[pickerIndex]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					头像上传
				</view>
				<!-- <view class="action">
					{{imgList.length}}/4
				</view> -->
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in headImg" :key="index" @tap="ViewImage" :data-url="headImg[index]">
						<image :src="headImg[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelHeadImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseHeadImage" v-if="headImg.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					身份证正反面上传
				</view>
				<view class="action">
					{{sfzImg.length}}/2
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in sfzImg" :key="index" @tap="ViewImage" :data-url="sfzImg[index]">
					 <image :src="sfzImg[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelSfzImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseSfzImage" v-if="sfzImg.length<2">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			
		</form>
		<view class="padding flex flex-direction">
			<button class="cu-btn  bg-olive lg">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				sex:'女',
				phone:'',
				code:'',
				serviceArea:'',
				workExp:'',
				headImg: [],
				sfzImg:[],
				region: ['浙江省', '绍兴市', '越城区'],
				picker: ['0-1年', '1-3年', '3-5年','5-10年'],
				pickerIndex:-1,
				switchSex:false,
				countdown:'获取验证码',
				disabled:false,
				timestatus:false
			}
		},
		onLoad() {},
		methods: {
			getCode() {
				var that = this;
			       that.disabled = true;//禁用点击
			                          
                uni.showToast({
                   title: '获取验证码成功',
                   icon: 'none'
                });
                that.countdown = 60;
                that.timestatus = true;
                that.clear = setInterval(that.countDown,1000);                
			                                  
			},
			// 倒计时
            countDown(){
                var that = this;
                if(!that.countdown){                    
                    that.disabled = false;
                    that.timestatus = false;
                    that.countdown = '获取验证码';
                    clearInterval(that.clear);
                }else{
                    --that.countdown;
                }
            },
			ChooseHeadImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.headImg.length != 0) {
							this.headImg = this.headImg.concat(res.tempFilePaths)
						} else {
							this.headImg = res.tempFilePaths
						}
					}
				});
			},
			ChooseSfzImage(){
				uni.chooseImage({
					count: 2, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.sfzImg.length != 0) {
							this.sfzImg = this.sfzImg.concat(res.tempFilePaths)
						} else {
							this.sfzImg = res.tempFilePaths
						}
					}
				});
			},
			DelHeadImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定删除？',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.headImg.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			DelSfzImg(e){
				uni.showModal({
					title: '提示',
					content: '确定删除？',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.sfzImg.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			getName(e){
				this.name = e.detail.value;
			},
			getPhone(e){
				this.phone = e.detail.value;
			},
			getYzm(e){
				this.code = e.detail.value;
			},
		
			RegionChange(e) {
				this.region = e.detail.value
				this.serviceArea = e.detail.value
			},
			PickerChange(e) {
				this.pickerIndex = e.detail.value
				this.workExp = this.picker[this.pickerIndex]
				console.log(this.workExp)
			},
			SwitchSex(e) {
				this.switchSex = e.detail.value
				if(e.detail.value){
					this.sex = '男';
				}else{
					this.sex = '女';
				}
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.margin-top{
		margin-top: 10upx;
	}
</style>
