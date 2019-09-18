<template>
	<view>
		<view class="header" v-bind:class="{'status':isH5Plus}">
			<view class="userinfo">
				<view class="face"><image :src="userinfo.face"></image></view>
				<view class="info">
					<view class="username">{{userinfo.username}}</view>
					<view class="integral">余额:{{userinfo.integral}}</view>
				</view>
			</view>
			<view class="setting">
				<view class="iconfont icon-shezhi"></view>
			</view>
		</view>
		<view class="orders">
			<view class="box">
				<view class="label" v-for="(row,index) in orderTypeLise" :key="row.name" hover-class="hover"  @tap="toOrderType(index)">
					<view class="icon"><view class="badge" v-if="row.badge>0">{{row.badge}}</view>
						<view class="iconfont " :class="row.icon"></view>
					</view>
					{{row.name}}
				</view>
			</view>
		</view> 
		<view class="list" v-for="(list,list_i) in severList" :key="list_i">
			<view class="li" v-for="(li,li_i) in list" @tap="toPage(list_i,li_i)" v-bind:class="{'noborder':li_i==list.length-1}"  hover-class="hover" :key="li.name" >
				<view class="icon">
					<view class="iconfont" :class="li.icon">
						
					</view>
					<!-- <image :src="'../../static/HM-PersonalCenter/sever/'+li.icon"></image> -->
				</view>
				<view class="text">{{li.name}}</view>
				<!-- <image class="to" src="../../static/HM-PersonalCenter/to.png"></image> -->
				<view class="iconfont icon-jiantou"></view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				//#ifdef APP-PLUS
				isH5Plus:true,
				//#endif
				//#ifndef APP-PLUS
				isH5Plus:false,
				//#endif
				userinfo:{},
				orderTypeLise:[
					//name-标题 icon-图标 badge-角标
					{name:'待付款',icon:'icon-daifukuan',badge:1},
					{name:'待发货',icon:'icon-daifahuo',badge:2},
					{name:'待收货',icon:'icon-daishouhuo',badge:6},
					{name:'待评价',icon:'icon-daipingjia',badge:9},
					{name:'售后服务',icon:'icon-shouhou',badge:0}
				],
				severList:[
					[
						{name:'我的预约',icon:'icon-yueyue'},
						{name:'我的收藏',icon:'icon-shoucang'},
						{name:'我的地址',icon:'icon-dizhi'}
						
					],
					[
						{name:'在线客服',icon:'icon-kefu'},
						{name:'意见反馈',icon:'icon-yijianfankui'},
						{name:'平台规则',icon:'icon-guize'},
						{name:'关于我们',icon:'icon-guanyuwomen'}
						
					]
				],
			};
		},
		onLoad() {
			//加载
			this.init();
		},
		methods: {
			init() {
				//用户信息
				this.userinfo={
					face:'http://img0.imgtn.bdimg.com/it/u=3511572440,3646830680&fm=26&gp=0.jpg',
					username:"Effort",
					integral:"1435"
				}		
			},
			//用户点击订单类型
			toOrderType(index){
				uni.showToast({title: this.orderTypeLise[index].name});
			},
			//用户点击列表项
			toPage(list_i,li_i){
				uni.showToast({title: this.severList[list_i][li_i].name});
			}
		}
	}
</script>

<style lang="scss">
page{background-color:#fff}
@font-face {font-family: "iconfont";
  src: url('https://at.alicdn.com/t/iconfont.eot?t=1568812918085'); /* IE9 */
  src: url('https://at.alicdn.com/t/iconfont.eot?t=1568812918085#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('https://at.alicdn.com/t/iconfont.woff?t=1568812918085') format('woff'),
  url('https://at.alicdn.com/t/iconfont.ttf?t=1568812918085') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('https://at.alicdn.com/t/iconfont.svg?t=1568812918085#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-jiantou:before {
  content: "\e632";
}

.icon-shezhi:before {
  content: "\e660";
}

.icon-guanyuwomen:before {
  content: "\e649";
}

.icon-yijianfankui:before {
  content: "\e63c";
}

.icon-dizhi:before {
  content: "\e614";
}

.icon-daipingjia:before {
  content: "\e611";
}

.icon-daifahuo:before {
  content: "\e615";
}

.icon-kefu:before {
  content: "\e61d";
}

.icon-shoucang:before {
  content: "\e86d";
}

.icon-yueyue:before {
  content: "\e610";
}

.icon-guize:before {
  content: "\e63d";
}

.icon-shouhou:before {
  content: "\e616";
}

.icon-daifukuan:before {
  content: "\e66a";
}

.icon-daishouhuo:before {
  content: "\e617";
}



.header{
	&.status{padding-top:var(--status-bar-height);}
	background: linear-gradient(to bottom ,#3598DC, #63B8FF);;width:100%;height:30vw;padding:0 4%;display:flex;align-items:center;
	.userinfo{
		width:90%;display:flex;
		.face{flex-shrink:0;width:15vw;height:15vw;
			image{width:100%;height:100%;border-radius:100%}
		}
		.info{
			display:flex;flex-flow:wrap;padding-left:30upx;
			.username{width:100%;color:#fff;font-size:40upx}
			.integral{display:flex;align-items:center;padding:0 20upx;height:40upx;color:#fff;background-color:rgba(0,0,0,0.1);border-radius:20upx;font-size:24upx}
		}
	}
	.setting{
		flex-shrink:0;width:6vw;height:6vw;
		.icon-shezhi{color: #fff;font-size: 40upx;}
	}
}
.hover{background-color:#eee}
.orders{
	background-color:#63B8FF;width:100%;height:11vw;padding:0 4%;margin-bottom:calc(11vw + 40upx);display:flex;align-items:flex-start;border-radius:0 0 100% 100%;margin-top: -1upx;
	.box{
		width:98%;padding:0 1%;height:22vw;background-color:#fefefe;border-radius:24upx;box-shadow:0 0 20upx rgba(0,0,0,0.15);margin-bottom:40upx;display:flex;align-items:center;justify-content:center;
		.label{
			display:flex;align-items:center;justify-content:center;flex-flow:wrap;width:100%;height:16vw;color:#666666;font-size:26upx;
			.icon{
				position:relative;width:7vw;height:7vw;margin:0 1vw;
				.badge{position:absolute;width:4vw;height:4vw;background-color:#ec6d2c;top:-1vw;right:-1vw;border-radius:100%;font-size:20upx;color:#fff;display:flex;align-items:center;justify-content:center;z-index: 10;}
				image{width:7vw;height:7vw;z-index: 9;}
			}
		}
	}
	.iconfont{
		font-size: 50upx;
	}
}
.list{
	width:100%;border-bottom:solid 26upx #f1f1f1;
	.li{
		width:100%;height:100upx;padding:0 4%;border-bottom:solid 1upx #e7e7e7;display:flex;align-items:center;
	&.noborder{border-bottom:0}
		.icon{
			flex-shrink:0;width:50upx;height:50upx;
			image{width:50upx;height:50upx}
		}
		.text{padding-left:20upx;width:100%;color:#666}
		.to{flex-shrink:0;width:40upx;height:40upx}
	}
	.iconfont{
		font-size: 45upx;
	}
	.icon-jiantou{
		font-size: 30upx;
		margin-right: 10upx;
	}
}
</style>
