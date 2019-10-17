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
			<view class="items">
				<view class="top">
					<view class="time">2019-10-17 17:41</view>
					<view class="status">待付款</view>
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
					{state:5,text: '售后'}
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
	
	
	.top{
		display: flex;
	}
	
</style>
