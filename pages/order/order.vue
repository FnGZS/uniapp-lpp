<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)">
				{{item.text}}
			</view>
		</view>
		<!-- <empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty> -->
		<view class="order">
			<view class="items" @tap="toDetail" v-for="item in orderList">
				<view class="top">
					<view class="time">{{item.gmtCreated}}</view>
					<view class="status">待付款</view>
				</view>
				<view class="center">
					<image class="img" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg" mode=""></image>
					<view class="info">
						<view class="name">{{item.employerName}}</view>
						<view class="work_time">{{item.work_time}}</view>
						<view class="num">接单量:{{item.num}}</view>
						<view class="label cu-tag  bg-orange">{{item.label}}</view>
					</view>
				</view>
				<!-- <view class="money">
					<view class="money_main">付款：￥{{item.unitPrice}}</view>
				</view> -->
				<view class="bottom">
					<view class="bottomList">
						<button class="cu-btn round line-grey sm" v-if="item.orderStatus==1">取消预约</button>
						<button class="cu-btn round line-blue sm" v-if="item.orderStatus==1">预约中</button>
						<button class="cu-btn round line-cyan sm"  v-if="item.orderStatus==2">已预约</button>
						<button class="cu-btn round line-gray sm"  v-if="item.orderStatus==3">预约关闭</button>
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
			</view>
		</view>
		
	</view>
</template> 

<script>
	import empty from "@/components/empty";
	import { sendAjax } from '@/common/js/sendAjax.js';
	import config from '@/apiConfig';
	const { getOrderList} = config.api;
	export default {
		components: {
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{state: 0,text: '全部'},
					// {state: 1,text: '待预约'},
					{state: 1,text: '预约中'},
					{state:2,text: '已预约'},
					{state: 3,text: '已关闭'}
					// {state: 4,text: '服务中'},
					// {state: 5,text: '待评价'}
				],
				orderList:[{id:0,gmtCreated:'2019-10-17 17:41',employerName:'王小姐',work_time:'1年工龄',num:45,label:'明星保洁员',orderStatus:3},
				{id:1,gmtCreated:'2019-10-17 17:41',employerName:'王小姐',work_time:'1年工龄',num:45,label:'明星保洁员',orderStatus:1},
				{id:2,gmtCreated:'2019-10-17 17:41',employerName:'王小姐',work_time:'2年工龄',num:45,label:'明星保洁员',orderStatus:2},
				{id:3,gmtCreated:'2019-10-17 17:41',employerName:'王小姐',work_time:'3年工龄',num:45,label:'明星保洁员',orderStatus:3},
				{id:3,gmtCreated:'2019-10-17 17:41',employerName:'王小姐',work_time:'4年工龄',num:45,label:'明星保洁员',orderStatus:1},
				{id:3,gmtCreated:'2019-10-17 17:41',employerName:'王小姐',work_time:'5年工龄',num:45,label:'明星保洁员',orderStatus:2}],
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
			},
			getOrderList(){
				var pageNum = this.pageNum;
				var pageSize = this.pageSize;
				var that = this;
				let infoOpt = {
					url: getOrderList,
					type: 'GET',
					data: {
						pageNum: pageNum,
						pageSize: pageSize
					}
				};
				let infoCb = {};
				infoCb.success = function(res) {
					that.orderList = res.list;
				},
				infoCb.beforeSend = () => {
				  uni.showLoading({
				  	title:'加载中'
				  })
				};
				sendAjax(infoOpt, infoCb);
			},
			toDetail(){
				uni.navigateTo({
					url:'orderDetail/orderDetail'
				})
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
			&.current{
				color: #08a1f2;
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
	
</style>
