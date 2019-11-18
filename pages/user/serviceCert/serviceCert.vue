<template>
	<view id='serviceCert'>
		<view v-if="status == 0">
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
				<button class="cu-btn  bg-olive lg" @click="submitBtn">提交</button>
			</view>
		</view>
		<view v-if="status == 1">
			<view class="tips ">
				<view class="cuIcon-emoji"></view>
				<view class="content">正在审核，请耐心等待</view>
			</view>
		</view>
		<view v-if="status == 3">
			<view class="tips ">
				<view class="cuIcon-roundclose"></view>
				<view class="content1">审核未通过</view>
				<view class="reason">原因：头像模糊</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 0,
				name: '',
				sex: '女',
				phone: '',
				code: '',
				serviceArea: '浙江省绍兴市越城区',
				workExp: '',
				headImg: [],
				arr_img_head: [],
				sfzImg: [],
				arr_img_sfz: [],
				region: ['浙江省', '绍兴市', '越城区'],
				picker: ['0-1年', '1-3年', '3-5年', '5-10年'],
				pickerIndex: -1,
				switchSex: false,
				countdown: '获取验证码',
				disabled: false,
				timestatus: false
			}
		},
		onLoad() {
			
		},
		onShow(){
			var isPastTest = uni.getStorageSync('pasttest');
			if(isPastTest == ''){
				uni.showModal({
				    title: '提示',
				    content: '请先通过考试认证',
				    success: function (res) {
				        if (res.confirm) {
				           uni.navigateTo({
				           	url:'../tests/index'
				           })
				        } else if (res.cancel) {
				           uni.navigateBack({
				           	
				           })
							
				        }
				    }
				});
			}
			console.log(isPastTest)
		},
		methods: {
			submitBtn() {
				var name = this.name;
				var sex = this.sex;
				var phone = this.phone;
				var code = this.code;
				var serviceArea = this.serviceArea;
				var workExp = this.workExp;
				var headImg = this.headImg;
				var sfzImg = this.sfzImg;
				if (name == '') {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					})
				} else if (phone == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
				} else if (code == '') {
					uni.showToast({
						title: '请输入正确的验证码',
						icon: 'none'
					})
				} else if (serviceArea == '') {
					uni.showToast({
						title: '请选择服务范围',
						icon: 'none'
					})
				} else if (workExp == '') {
					uni.showToast({
						title: '请选择工作经验',
						icon: 'none'
					})
				} else if (headImg.length == 0) {
					uni.showToast({
						title: '请选择头像',
						icon: 'none'
					})
				} else if (sfzImg.length < 2) {
					uni.showToast({
						title: '请选择身份证',
						icon: 'none'
					})
				} else {
					uni.showLoading({
						title: '提交中'
					})
					this.uploadimgHead();
					this.uploadimgSfz();
				}

			},
			//完成提交去审核
			publish() {
				uni.hideLoading();
			},
			uploadimgHead() { //这里触发图片上传的方法
				var pics = this.headImg;
				var that = this;
				that.uploadimgs_head({
					url: 'https://www.sxscott.com/housework/upload/avatar', //这里是你图片上传的接口
					path: pics, //这里是选取的图片的地址数组
					formData: {
						type: 'head'
					}
				});
			},
			uploadimgSfz() { //这里触发图片上传的方法
				var pics = this.sfzImg;
				var that = this;
				that.uploadimgs_sfz({
					url: 'https://www.sxscott.com/housework/upload/avatar', //这里是你图片上传的接口
					path: pics, //这里是选取的图片的地址数组
					formData: {
						type: 'sfz'
					}
				});
			},

			uploadimgs_head(data) {
				var that = this;
				var i = data.i ? data.i : 0; //当前上传的哪张图片
				var success = data.success ? data.success : 0; //上传成功的个数
				var fail = data.fail ? data.fail : 0; //上传失败的个数
				var pics = data.pics ? data.pics : [];
				uni.uploadFile({
					header: {
						'content-type': 'application/json',
						'Authorization': "Bearer " + uni.getStorageSync('userInfo').token
					},
					url: data.url,
					filePath: data.path[i],
					name: 'file', //这里根据自己的实际情况改
					formData: data.formData, //这里是上传图片时一起上传的数据
					success: (resp) => {
						console.log(JSON.parse(resp.data))
						success++; //图片上传成功，图片上传成功的变量+1
						pics.push(JSON.parse(resp.data).data);

					},
					fail: (res) => {
						fail++; //图片上传失败，图片上传失败的变量+1
						console.log('fail:' + i + "fail:" + fail);
					},
					complete: () => {
						i++; //这个图片执行完上传后，开始上传下一张
						if (i == data.path.length) { //当图片传完时，停止调用          
							console.log('成功：' + success + " 失败：" + fail);
							that.arr_img_head = pics
							console.log(that.arr_img_head)
							// that.publish();
						} else { //若图片还没有传完，则继续调用函数
							data.i = i;
							data.success = success;
							data.fail = fail;
							data.pics = pics;
							that.uploadimgs_head(data);
						}
					}
				});
			},
			uploadimgs_sfz(data) {
				var that = this;
				var i = data.i ? data.i : 0; //当前上传的哪张图片
				var success = data.success ? data.success : 0; //上传成功的个数
				var fail = data.fail ? data.fail : 0; //上传失败的个数
				var pics = data.pics ? data.pics : [];
				uni.uploadFile({
					header: {
						'content-type': 'application/json',
						'Authorization': "Bearer " + uni.getStorageSync('userInfo').token
					},
					url: data.url,
					filePath: data.path[i],
					name: 'file', //这里根据自己的实际情况改
					formData: data.formData, //这里是上传图片时一起上传的数据
					success: (resp) => {
						console.log(JSON.parse(resp.data))
						success++; //图片上传成功，图片上传成功的变量+1
						pics.push(JSON.parse(resp.data).data);

					},
					fail: (res) => {
						fail++; //图片上传失败，图片上传失败的变量+1
						console.log('fail:' + i + "fail:" + fail);
					},
					complete: () => {
						i++; //这个图片执行完上传后，开始上传下一张
						if (i == data.path.length) { //当图片传完时，停止调用          
							console.log('成功：' + success + " 失败：" + fail);
							that.arr_img_sfz = pics
							console.log(that.arr_img_sfz)
							that.publish();
						} else { //若图片还没有传完，则继续调用函数
							data.i = i;
							data.success = success;
							data.fail = fail;
							data.pics = pics;
							that.uploadimgs_sfz(data);
						}
					}
				});
			},
			getCode() {
				var that = this;
				that.disabled = true; //禁用点击
				uni.showToast({
					title: '获取验证码成功',
					icon: 'none'
				});
				that.countdown = 60;
				that.timestatus = true;
				that.clear = setInterval(that.countDown, 1000);
			},
			// 倒计时
			countDown() {
				var that = this;
				if (!that.countdown) {
					that.disabled = false;
					that.timestatus = false;
					that.countdown = '获取验证码';
					clearInterval(that.clear);
				} else {
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
			ChooseSfzImage() {
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
			DelSfzImg(e) {
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
			getName(e) {
				this.name = e.detail.value;
			},
			getPhone(e) {
				this.phone = e.detail.value;
			},
			getYzm(e) {
				this.code = e.detail.value;
			},

			RegionChange(e) {
				console.log(e.detail.value)
				this.region = e.detail.value
				this.serviceArea = e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
			},
			PickerChange(e) {
				this.pickerIndex = e.detail.value
				this.workExp = this.picker[this.pickerIndex]
				console.log(this.workExp)
			},
			SwitchSex(e) {
				this.switchSex = e.detail.value
				if (e.detail.value) {
					this.sex = '男';
				} else {
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

	.margin-top {
		margin-top: 10upx;
	}
		
	.tips{
		width: 100%;
		margin: auto;
		text-align: center;
		margin-top: 250upx;
	}
	
	.cuIcon-emoji{
		font-size: 100upx;
		color: #007AFF;
	}
	.cuIcon-roundclose{
		font-size: 100upx;
		color: #DD514C;
	}
	.content{
		margin-top: 10upx;
		color: #007AFF;
	}
	.content1{
		margin-top: 10upx;
		color: #DD514C;
	}
	.reason{
		margin-top: 10upx;
		color: #DD514C;
	}
</style>
