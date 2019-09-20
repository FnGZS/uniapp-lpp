<template>
	<view class="container">
		<view class="form-box">
			<view class="row-wrap">
				<view class="label">联系人</view>
				<view class="label-right">
					<input name="linkMan" class="input" type="text" placeholder="姓名" :value="name" v-on:change='input_name' />
				</view>
			</view>
			<view class="row-wrap">
				<view class="label">手机号码</view>
				<view class="label-right">
					<input name="mobile" class="input" maxlength="11" type="number" placeholder="11位手机号码" :value="phone" v-on:change='input_phone' />
				</view>
			</view>
			<view class="row-wrap">
				<view class="label">详细地址</view>
				<view class="label-right">
					<input name="address" class="input" placeholder="如（北区11幢xxx寝室）" :value='postion' v-on:change='input_postion' />
				</view>
			</view>
	
			<view class="row-wrap">
				<view class="label">是否默认</view>
				<view class="label-right">
					<form class='isDefault'>
						<switch name="switch" :checked="isDefault" @change="changeIsDefault" />
					</form>
				</view>
			</view>
		</view>
		<button class="save-btn" @click='save'>保存</button>
		<button class="delete-btn" @click="deleteBtn">删除</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:null,
				userId: null,
				name: '',
				phone: '',
				postion: '',
				isDefault: false
			}
		},
		onLoad(options) {
			 var detail = JSON.parse(options.detail);
			 if(detail.isDefault == 1){
			   var isDefault = true;
			 }else{
			   var isDefault = false;
			 }
			this.id=detail.id,
			this.name=detail.name,
			this.phone=detail.telephone,
			this.postion=detail.address,
			this.isDefault=isDefault
		},
		methods: {
			save: function() {
				var userId = this.userId;
				var name = this.name;
				var phone = this.phone;
				var postion = this.postion;
				var isDefault = this.isDefault;
				if (name == '' || name == null) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none',
						duration: 1000
					})
				} else if (phone == '' || phone == null) {
					uni.showToast({
						title: '请输入手机号码',
						icon: 'none',
						duration: 1000
					})
				} else if (phone.length != 11) {
					uni.showToast({
						title: '请输入11位的手机号码',
						icon: 'none',
						duration: 1000
					})
				} else if (postion == '' || postion == null) {
					uni.showToast({
						title: '请输入详细地址',
						icon: 'none',
						duration: 1000
					})
				} else {
					//上传添加地址
					var that = this;
					if (isDefault) {
						isDefault = 1;
					} else {
						isDefault = 0;
					}
					var data = {
						'userId': userId,
						'name': name,
						'telephone': phone,
						'address': postion,
						'isDefault': isDefault
					}
					console.log(data)
				}
			},
			
			input_name: function(e) {
				this.name = e.detail.value
			},
			input_phone: function(e) {
				this.phone = e.detail.value
			},
			input_postion: function(e) {
				console.log(e)
				this.postion = e.detail.value
			},
			changeIsDefault: function(e) {
				var isDefault = this.isDefault;
				this.isDefault = !isDefault;
			},
		}
	}
</script>

<style>
	page {
		height: 100%;
	}
	
	.container {
		justify-content: initial;
	}
	
	.form-box {
		width: 100%;
		background-color: #fff;
	}
	
	.row-wrap {
		width: 90%;
		margin-left: 5%;
		height: 88rpx;
		line-height: 88rpx;
		border-bottom: 1rpx solid #eee;
		display: flex;
		font-size: 28rpx;
		/*justify-content: space-between;*/
	}
	
	.row-wrap .label {
		width: 160rpx;
		color: #000
	}
	
	.row-wrap .label-right {
		flex: 1;
		height: 88rpx;
		line-height: 88rpx;
	}
	
	.row-wrap .label-right input {
		height: 100%;
		font-size: 28rpx;
		padding-right: 30rpx;
	}
	
	.row-wrap .right-box {
		margin-right: 30rpx;
	}
	
	.arrow-right {
		width: 15rpx;
		height: 24rpx;
	}
	
	.save-btn,
	.cancel-btn {
		width: 90%;
		margin-left: 5%;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		margin-top: 30rpx;
		border-radius: 6rpx;
		box-sizing: border-box;
	}
	
	.save-btn {
		background-color: #3598DC;
		color: #fff;
		font-size: 28rpx;
	}
	.delete-btn{
	    width: 90%;
	    margin-left: 5%;
	    height: 60rpx;
	    line-height: 60rpx;
	    text-align: center;
	    margin-top:10rpx; 
	    border-radius: 6rpx;
	    box-sizing: border-box;
	      background-color: #C4C4C4;
	    color:#fff;
	    font-size: 28rpx;
	}
	button[type="default"] {
		background-color: #ffffff;
		color: #000;
	}
	
	.addr-details {
		height: auto;
		padding: 30rpx 0;
		margin-left: 30rpx;
		border-bottom: 1rpx solid #eee;
		display: flex;
		font-size: 28rpx;
	}
	
	.addr-details .label {
		margin: auto 0 auto 0;
		width: 160rpx;
		color: #000
	}
	
	.addr-details textarea {
		box-sizing: border-box;
		width: 480rpx;
		overflow: scroll;
	}
	
	picker {
		min-width: 20rpx;
		height: 100%;
		margin-right: 20rpx;
	}
	
	.hui {
		color: #777;
	}
	
	.isDefault {
		float: right;
	
	}
</style>
