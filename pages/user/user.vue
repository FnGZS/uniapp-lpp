<template>
	<view>
		<view class="header" v-bind:class="{'status':isH5Plus}">
			<view class="userInfo">
				<view class="face"><image :src="userInfo.headimgurl"></image></view>
				<view class="info">
					<view class="username">{{userInfo.nickName}}</view>
					<view class="integral">普通用户</view>
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
				</view>
				<view class="text">{{li.name}}</view>
				<view class="iconfont icon-jiantou"></view>
				<button v-if="li.icon =='icon-kefu'" class='service-kefu-btn' plain open-type="contact"></button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userInfo:null,
				orderTypeLise:[
					//name-标题 icon-图标 badge-角标
					{name:'全部订单',icon:'icon-daipingjia',badge:0},
					{name:'预约中',icon:'icon-daifukuan',badge:1},
					{name:'预约成功',icon:'icon-daifahuo',badge:2},
					{name:'预约失败',icon:'icon-yuyueshibai',badge:6},
					{name:'已关闭',icon:'icon-yiguanbi',badge:9}
					
				],
				severList:[
					[
						// {name:'我的地址',icon:'icon-dizhi',url:'address/address'},
						{name:'积分兑换',icon:'icon-shoucang',url:''},
						{name:'我的兑换',icon:'icon-shoucang',url:''},
						{name:'考试认证',icon:'icon-fuwurenzheng',url:'tests/index'},
						{name:'服务认证',icon:'icon-fuwurenzheng',url:'serviceCert/serviceCert'},
						{name:'排班信息',icon:'icon-paiban',url:'paiban/paiban'},
					],
					
					[
						{name:'在线客服',icon:'icon-kefu',url:''},
						{name:'平台规则',icon:'icon-guize',url:'rule/rule'},
						{name:'关于我们',icon:'icon-guanyuwomen',url:'aboutUs/aboutUs'}
						
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
				var userInfo = uni.getStorageSync('userInfo')
				userInfo['integral'] = "88888888"
				console.log(userInfo)
				//用户信息
				this.userInfo = userInfo	
				console.log(this.userInfo.nickName)
			},
			//用户点击订单类型
			toOrderType(index){
				// uni.showToast({title: this.orderTypeLise[index].name});
				var toUrl = this.orderTypeLise[index].url;
				uni.navigateTo({
					url:toUrl
				})
			},
			//用户点击列表项
			toPage(list_i,li_i){
				//获取跳转的选项
				var toUrl = this.severList[list_i][li_i].url;
				if(toUrl == ''){
					uni.showToast({
						title:'暂无开放，请耐心等待',
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url:toUrl
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
page{background-color:#fff}

@font-face {font-family: "iconfont";
  src: url('https://at.alicdn.com/t/iconfont.eot?t=1572452376652'); /* IE9 */
  src: url('https://at.alicdn.com/t/iconfont.eot?t=1572452376652#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('https://at.alicdn.com/t/iconfont.woff?t=1572452376652') format('woff'),
  url('https://at.alicdn.com/t/iconfont.ttf?t=1572452376652') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('https://at.alicdn.com/t/iconfont.svg?t=1572452376652#iconfont') format('svg'); /* iOS 4.1- */
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

.icon-yuyueshibai:before {
  content: "\e87c";
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

.icon-fuwurenzheng:before {
  content: "\e636";
}

.icon-paiban:before {
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

.icon-yiguanbi:before {
  content: "\e600";
}





.header{
	&.status{padding-top:var(--status-bar-height);}
	background: linear-gradient(to bottom ,#3598DC, #63B8FF);;width:100%;height:30vw;padding:0 4%;display:flex;align-items:center;
	.userInfo{
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
.service-kefu-btn{
	position: absolute;
	width: 90%;
	left: 5%;
	height: 8%;
	background: #fff;
	text-align: left;
	font-size: 28upx;

}
button[plain] {
  color:#6D6C6B;
  
padding-left:0;
border:none;
background-color:transparent;

}
	
</style>
