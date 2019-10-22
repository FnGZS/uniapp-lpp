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
			<view class="items" @tap="toDetail">
				<view class="top">
					<view class="time">2019-10-17 17:41</view>
					<view class="status">待付款</view>
				</view>
				<view class="center">
					<image class="img" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg" mode=""></image>
					<view class="info">
						<view class="name">王小姐</view>
						<view class="work_time">2年工龄</view>
						<view class="num">接单量:45</view>
						<view class="label cu-tag  bg-orange">明星保洁员</view>
					</view>
				</view>
				<view class="money">
					<view class="money_main">付款：￥20</view>
				</view>
				<view class="bottom ">
					<button class="cu-btn round line-grey sm">取消订单</button>
					<button class="cu-btn round line-red sm">立即支付</button>
					<button class="cu-btn round line-gray sm">预约失败</button>
					<button class="cu-btn round line-blue sm">预约中</button>
					<button class="cu-btn round line-cyan sm">待服务</button>
					<button class="cu-btn round line-green sm">服务中</button>
					<button class="cu-btn round line-orange sm">去评价</button>
					<button class="cu-btn round line-pink sm">已评价</button>
				</view>
			</view>
		</view>
		
	</view>
</template> 

<script>
	import empty from "@/components/empty";
	export default {
		components: {
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{state: 0,text: '全部'},
					{state: 1,text: '待预约'},
					{state: 2,text: '待付款'},
					{state: 3,text: '待服务'},
					{state: 4,text: '待评价'},
					{state: 5,text: '售后'}
				],
			};
		},
		
		onLoad(options){
			this.tabCurrentIndex = +options.state||0;
		},
		 
		methods: {
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
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
		position: relative;
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
			right: 20%;
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
		.cu-btn{
			margin-left: 10upx;
		}
	}
	
</style>
