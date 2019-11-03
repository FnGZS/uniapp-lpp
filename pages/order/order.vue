<template>
	<view class="content">
		<form @submit="getFormId" report-submit="true">
			 <view class="navbar">
				 <button form-type="submit" v-for="(item, index) in navList" :key="index" class="nav-item"
					:class="{current: tabCurrentIndex === index}"
					@click="tabClick(index)" hover-class="button-hover" >
					{{item.text}}
				 </button>
			 </view>
		</form>
		<!-- <empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty> -->
		<view class="order">
			<view class="items" @tap="toDetail" v-for="item in orderList" :data-id="item.id" :key="key">
				<view class="top">
					<view class="time">{{item.gmtCreated}}</view>
					<view class="status">待付款</view>
				</view>
				<view class="center">
					<image class="img" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg" mode=""></image>
					<view class="info">
						<view class="name">{{item.cleaner.name}}</view>
						<view class="work_time">{{item.cleaner.work}}年工作经验</view>
						<view class="num">接单量:{{item.cleaner.total}}</view>
						<view class="label cu-tag  bg-orange">{{item.cleaner.card}}</view>
					</view>
				</view>
				<!-- <view class="money">
					<view class="money_main">付款：￥{{item.unitPrice}}</view>
				</view> -->
				<form @submit="getFormId" report-submit="true">
					<view class="bottom">
						<view class="bottomList">
							<button form-type="submit" class="cu-btn round line-grey sm" v-if="item.orderState==1 && role == 1" v-on:click.stop="userCancelOrder" :data-detail="item" :data-id="item.id">取消预约</button>
							<button form-type="submit" class="cu-btn round line-grey sm" v-if="item.orderState==1 && role ==2" v-on:click.stop="cleanerCancelOrder" :data-detail="item" :data-id="item.id">取消预约</button>
							<button form-type="submit" class="cu-btn round line-blue sm" v-if="item.orderState==1 && role == 1" v-on:click.stop="">预约中</button>
							<button form-type="submit" class="cu-btn round line-blue sm" v-if="item.orderState==1 && role == 2"  v-on:click.stop="confirmOrder" :data-detail="item" :data-id="item.id">确认预约</button>
							<button form-type="submit" class="cu-btn round line-cyan sm"  v-if="item.orderState==2" v-on:click.stop="" >预约成功</button>
							<button form-type="submit" class="cu-btn round line-gray sm"  v-if="item.orderState==3" v-on:click.stop="">预约失败</button>
							<button form-type="submit" class="cu-btn round line-gray sm"  v-if="item.orderState==4" v-on:click.stop="">交易关闭</button>
							
							<!-- <button class="cu-btn round line-grey sm" v-if="item.goodsState==0 && item.fuwuState == 2">取消订单</button>
							<button class="cu-btn round line-red sm"  v-if="item.goodsState==0 && item.fuwuState == 2">立即支付</button>
							<button class="cu-btn round line-gray sm" v-if="item.goodsState==0 && item.fuwuState == 0">预约失败</button>
							<button class="cu-btn round line-blue sm" v-if="item.goodsState==0 && item.fuwuState == 1">预约中</button>
							<button class="cu-btn round line-cyan sm"  v-if="item.goodsState==1 && item.fuwuState == 2">待服务</button>
							<button class="cu-btn round line-green sm"  v-if="item.goodsState==1 && item.fuwuState == 3">服务中</button>
							<button class="cu-btn round line-orange sm"  v-if="item.goodsState==1 && item.fuwuState == 4">去评价</button>
							<button class="cu-btn round line-pink sm"  v-if="item.goodsState==1 && item.fuwuState ==4">付尾款</button>
							<button class="cu-btn round line-pink sm"  v-if="item.goodsState==1 && item.fuwuState ==5">已评价</button> -->
						</view>
					</view>
				</form>
			</view>
		</view>
		
	</view>
</template> 

<script>
	import empty from "@/components/empty";
	import { sendAjax } from '@/common/js/sendAjax.js';
	import { templeMsg } from '@/common/js/templeMsg.js';
	import config from '@/apiConfig';
	const { getFormId,getOrderList,updateOrderState} = config.api;
	export default {
		components: {
			empty
		},
		data() {
			return {
				role:1, //模拟身份，1为用户，2为保洁员
				tabCurrentIndex: 0,
				navList: [{state: 0,text: '全部'},
					// {state: 1,text: '待预约'},
					{state: 1,text: '预约中'},
					{state:2,text: '已预约'},
					{state: 3,text: '已失败'},
					{state: 4,text: '已关闭'}
					// {state: 4,text: '服务中'},
					// {state: 5,text: '待评价'}
				],
				orderList:[],
				orderState:0,
				pageNum: 1,
				pageSize: 5
			};
		},
		
		onLoad(options){
			this.tabCurrentIndex = +options.state||0;
			this.getOrderList();
		},
		 
		methods: {
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
				this.orderState = index;
				this.getOrderList();
			},
			userCancelOrder(e){
				var that = this;
				var detail = e.currentTarget.dataset.detail;
				var id = e.currentTarget.dataset.id;
				var name = detail.employerName;
				var phone = detail.employerPhone;
				var address = detail.address;
				var time = detail.startTime;
				var reason = '用户取消预约';
				var cleanerId = detail.clearnerId;
				uni.showModal({
				    title: '提示',
				    content: '确认取消预约？',
				    success: function (res) {
				        if (res.confirm) {
				           var data = {
				           		 id:id,
				           		 orderState:3
				           	}
				           let infoOpt = {
				           	url: updateOrderState,
				           	type: 'PUT',
				           	data: JSON.stringify(data),
				           };
				           let infoCb = {};
				           infoCb.success = function(res) {
				           	console.log(res)
				           	if(res == null){
								  var template_id = 'Z3NPw5AOxC8Dt4-qETy-a2aQrEaQ02Dfy3iQdm-mleE';
								  var page = '/pages/order/order';
								  var data = {
									"keyword1": {
									  "value": id
									},
									"keyword2": {
									  "value": name
									},
									"keyword3": {
									  "value": phone
									},
									"keyword4": {
									  "value": address
									},
									"keyword5": {
									  "value": time
									},
									"keyword5": {
									  "value": reason
									}
									
								  };
								  templeMsg(cleanerId,template_id, page, data);
				           		uni.showToast({
				           			title:'取消成功'
				           		})
								that.getOrderList();
				           	}
				           	uni.hideLoading()
				           },
				           infoCb.beforeSend = () => {
				             uni.showLoading({
				             	title:'加载中',
								icon:'none'
				             })
				           };
				           sendAjax(infoOpt, infoCb,1);
				        } else if (res.cancel) {
				            
				        }
				    }
				});
			},
			cleanerCancelOrder(e){
				var that = this;
				var detail = e.currentTarget.dataset.detail;
				var id = e.currentTarget.dataset.id;
				var name = detail.employerName;
				var phone = detail.employerPhone;
				var address = detail.address;
				var time = detail.startTime;
				var reason = '保洁员取消预约';
				var cleanerName = detail.cleaner.name;
				var userOpenId = detail.employerId;
				uni.showModal({
				    title: '提示',
				    content: '确认取消预约？',
				    success: function (res) {
				        if (res.confirm) {
				           var data = {
				           		 id:id,
				           		 orderState:3
				           	}
				           let infoOpt = {
				           	url: updateOrderState,
				           	type: 'PUT',
				           	data: JSON.stringify(data),
				           };
				           let infoCb = {};
				           infoCb.success = function(res) {
				           	console.log(res)
				           	if(res == null){
								  var template_id = 'eWomX6rSFV-hnNJ_cQBC24CskcMUUs4uCuA_CamgjWg';
								  var page = '/pages/order/order';
								  var data = {
									"keyword1": {
									  "value": cleanerName
									},
									"keyword2": {
									  "value": name
									},
									"keyword3": {
									  "value": phone
									},
									"keyword4": {
									  "value": address
									},
									"keyword5": {
									  "value": time
									},
									"keyword6": {
									  "value": reason
									}
									
								  };
								  templeMsg(userOpenId,template_id, page, data);
				           		uni.showToast({
				           			title:'取消成功'
				           		})
								that.getOrderList();
				           	}
				           	uni.hideLoading()
				           },
				           infoCb.beforeSend = () => {
				             uni.showLoading({
				             	title:'加载中',
								icon:'none'
				             })
				           };
				           sendAjax(infoOpt, infoCb,1);
				        } else if (res.cancel) {
				            
				        }
				    }
				});
			},
			confirmOrder(e){
				var that = this;
				var id = e.currentTarget.dataset.id;
				var detail = e.currentTarget.dataset.detail;
				var name = detail.employerName;
				var phone = detail.employerPhone;
				var address = detail.address;
				var time = detail.startTime;
				var userOpenId = detail.employerId;
				uni.showModal({
				    title: '提示',
				    content: '确认预约？',
				    success: function (res) {
				        if (res.confirm) {
				           var data = {
				           		 id:id,
				           		 orderState:2
				           	}
				           let infoOpt = {
				           	url: updateOrderState,
				           	type: 'PUT',
				           	data: JSON.stringify(data),
				           };
				           let infoCb = {};
				           infoCb.success = function(res) {
				           	console.log(res)
				           	if(res == null){
								var template_id = 'mPkWwY2fUYwJLcwpnJk9Sr7PdIPkUtmNnN9aq9iU5-4';
								var page = '/pages/order/order';
								var data = {
										"keyword1": {
										  "value": id
										},
										"keyword2": {
										  "value": name
										},
										"keyword3": {
										  "value": phone
										},
										"keyword4": {
										  "value": address
										},
										"keyword5": {
										  "value": time
										}
																	
								};
								templeMsg(userOpenId,template_id, page, data);
				           		uni.showToast({
				           			title:'确认成功'
				           		})
								that.getOrderList();
				           	}
				           	uni.hideLoading()
				           },
				           infoCb.beforeSend = () => {
				             uni.showLoading({
				             	title:'加载中',
								icon:'none'
				             })
				           };
				           sendAjax(infoOpt, infoCb,1);
				        } else if (res.cancel) {
				            
				        }
				    }
				});
			},
			getOrderList(){
				var pageNum = this.pageNum;
				var pageSize = this.pageSize;
				var employerId = uni.getStorageSync('userInfo').openId;
				var orderState = this.orderState;
				var that = this;
				if(this.orderState == 0){
					var data = {
						employerId:employerId,
						pageNum: pageNum,
						pageSize: pageSize
					}
				}else{
					var data = {
						employerId:employerId,
						orderState:orderState,
						pageNum: pageNum,
						pageSize: pageSize
					}
				}
				
				let infoOpt = {
					url: getOrderList,
					type: 'GET',
					data:data
				};
				let infoCb = {};
				infoCb.success = function(res) {
					that.orderList = res.list;
					uni.hideLoading()
				},
				infoCb.beforeSend = () => {
				  uni.showLoading({
				  	title:'加载中'
				  })
				};
				sendAjax(infoOpt, infoCb);
			},
			toDetail(e){
				var id = e.currentTarget.dataset.id;
				uni.navigateTo({
					url:'orderDetail/orderDetail?id='+id
				})
			},
			//收集formId
			  getFormId:function(e){
				  console.log(e)
			    var formId = e.detail.formId;
			    // var userId = wx.getStorageSync('userinfo').userId;
			    var openId = uni.getStorageSync('userInfo').openId;
			    console.log(openId)
			    if (formId != 'the formId is a mock one'){
			      var that = this;
			      let infoOpt = {
			        url:getFormId,
			        type: 'POST',
			        data: {
			          // userId: userId,
			          openId: openId,
			          formId: formId
			        },
			        header: {
			          'content-type': 'application/json',
			        },
			      }
			      let infoCb = {}
			      infoCb.success = function (res) {
					  console.log(res)
			      }
			      infoCb.beforeSend = () => { }
			      sendAjax(infoOpt, infoCb, () => { });
			    }
			    
			  }
			
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: #f8f8f8;
		height: 100%;
	}
	
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: sticky;
		top: 0upx;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 25upx;
			color: #303133;
			position: relative;
			background:#fff;
			&.current{
				color: #08a1f2;
				// position:absolute;
				// bottom:0;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid #08a1f2;
				}
			}
		}
	}

	.items{
		background: #fff;
		margin-top: 5upx;
	}
	.top{
		display: flex;
		padding-top:10upx;
		position:relative;
		font-size: 25upx;
		.time{
			margin-left: 5%;
		}
		.status{
			position: absolute;
			right: 5%;
			top: 10upx;
		}
	}
	.center{
		margin-left: 5%;
		margin-top:10upx;
		display:flex;
		position:relative;
		.img{
			width: 120upx;
			height: 120upx;
		}
		.name{
			font-size: 28upx;
			margin-left: 20upx;
		}
		.work_time{
			font-size: 25upx;
			margin-left: 20upx;
			line-height: 50upx;
		}
		.num{
			font-size: 25upx;
			margin-left: 20upx;
			color:#C6C6C6 ;
		}
		.label{
			position: absolute;
			top: 10upx;
			right: 5%;
			font-size: 20upx;
		}
	}
	.money{
		position: relative;
		height:40upx;
		.money_main{
			position: absolute;
			right: 5%;
			font-size: 25upx;
			line-height: 40upx;
			color: red;
		}
	}

	.bottom{
		margin:0 5%;
		padding:15upx 0;
		height:75upx;
		.bottomList{
			position:absolute;
			right:5%;
		}
		.cu-btn{
			margin-left: 10upx;
		}
	}
	
	button::after{
	  border:none;
	  top: 75upx;
	}
	 button.button-hover {
	  background-color: #fff;
	}

</style>
