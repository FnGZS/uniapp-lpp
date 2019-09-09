<template>
	<view>
		<view id="cleanNoraml">
		  <view id="swiper-tab">
		    <view class="swiper-tab">
		      <view class="swiper-tab-list" :class="currentTab==0 ? 'on' : ''" data-current="0" @click="tabNav">{{first}}
		        <i></i>
		      </view>
		      <view class="swiper-tab-list" :class="currentTab==1 ? 'on' : ''" data-current="1" @click="tabNav">{{second}}
		        <i></i>
		      </view>
		      <view class="swiper-tab-list" :class="currentTab==2 ? 'on' : ''" data-current="2" @click="tabNav">{{thirds}}
		        <i></i>
		      </view>
		    </view>
		    <swiper :current="currentTab" duration="500" class="swiper-item" v-bind:style='{display:displays}'>
		      <swiper-item>
		        <view class="location_bottom" >
		          <view v-for="(item,index) in cityArr" :key="index" :class="city_index == index + 1?'add_citying':'add_city'" :data-num="index + 1" @click="clickCity" :data-name="item.value">{{item.value}}</view>
		        </view>
		      </swiper-item>
		      <swiper-item>
		        <view class="location_bottom">
		          <view v-for="(item,index) in priceArr" :key="index" :class="price_index == index + 1?'add_priceing':'add_price'" :data-num="index + 1" @click="clickPrice" :data-name="item.value">{{item.value}}</view>
		        </view>
		      </swiper-item>
		      <swiper-item>
		        <view class="location_bottom">
		          <view v-for="(item,index) in amountArr" :key="index" :class="amount_index == index + 1?'add_amounting':'add_amount'" :data-num="index + 1" @click="clickAmount" :data-name="item.value">{{item.value}}</view>
		        </view>
		      </swiper-item>
		    </swiper>
		  </view>
		  <view class="swiper-beijing" @click="hideNav" v-bind:style='{display:displays}'></view>
		  <view class="listMain">
		    <view class='list' v-for="(item,index) in list" :key="index">
		      <view class='list-left'>
		        <image class='list-left-img' src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1034389669,3064515247&fm=26&gp=0.jpg'></image>
		        <view class='list-left-line'></view>
		        <view class='list-left-phone'>
		          <view class='iconfont icon-dianhua'></view>
		        </view>
		      </view>
		      <view class='list-center'>
		        <view class='list-name'>王小姐</view>
		        <view class='list-time'>2年保洁工龄</view>
		        <view class='list-num'>
		            <view class='list-num-jiedan'>
		              <view class='list-num-jiedan-text'>接单量</view>
		              <view class='list-num-jiedan-number'>45</view>
		            </view>
		            <view class='list-num-tuidan'>
		              <view class='list-num-tuidan-text'>退单量</view>
		              <view class='list-num-tuidan-number'>2</view>
		            </view>
		        </view>
		      </view>
		      <view class='list-right'>
		        <view class='iconfont icon-biaoqian'>
		          <view class='list-score'>4.9</view>
		        </view>
		        <view class='list-yuyue'>预约</view>
		      </view>
		    </view>
		  </view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
				first: '地区',
				second: '价格',
				thirds: '接单量',
				fours: '类型',
				city_index: 0,
				price_index: 0,
				amount_index: 0,
				type_index: 0,
				displays:'none',
				cityArr: [{ 'value': '全部' }, { 'value': '越城区' }, { 'value': '柯桥区' }, { 'value': '上虞区' }],
				priceArr: [{ 'value': '默认' }, { 'value': '价格升序' }, { 'value': '价格降序' }],
				amountArr: [{ 'value': '默认' }, { 'value': '接单量升序' }, { 'value': '接单量降序' }],
				typeArr: [{ 'value': '默认' }, { 'value': '明星保洁员' }, { 'value': '普通保洁员' }],
				currentTab: 0,
				list:[
				  {}, {}, {}, {}, {}, {}, {}
				]
			};
		},
		methods: {
			// 点击空白处
			  hideNav: function () {
				this.displays= "none"
			  },
			  // 点击导航栏
			  tabNav: function (e) {
				  this.displays= "block"
				if (this.currentTab === e.target.dataset.current) {
				  return false;
				} else {
				  this.currentTab=e.target.dataset.current

				}
			  },
			
			  // 点击地区
			  clickCity: function (e) {
				  this.city_index =e.target.dataset.num,
				  this.first = e.target.dataset.name,
				  this.displays = "none"
			  },
			  // 点击价格
			  clickPrice: function (e) {
				  this.price_index= e.target.dataset.num,
				  this.second= e.target.dataset.name,
				  this.displays="none"
			  },
			  // 点击接单量
			  clickAmount: function (e) {
				  this.amount_index=e.target.dataset.num,
				  this.thirds= e.target.dataset.name,
				  this.displays="none"
			  },
			  // 点击接单量
			  clickType: function (e) {
				  this.type_index= e.target.dataset.num,
				  this.fours=e.target.dataset.name,
				  this.displays= "none"
			  },
		}
	}
				
</script>

<style>
	@font-face {font-family: "iconfont";
	  src: url('https://at.alicdn.com/t/iconfont.eot?t=1566039818041'); /* IE9 */
	  src: url('https://at.alicdn.com/t/iconfont.eot?t=1566039818041#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALoAAsAAAAABrAAAAKZAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqBFIEcATYCJAMMCwgABCAFhG0HPBvoBciemjwpEctEiELim4f5ABNFEO33Ont3IQBJkn2+CpKKEbFRbY0kodjoCsO6te9Q1w4v7sHsbUR9Uqkkbd/y5POoTMz4arazwgij+U6a845Vja7Pczm9CXQg82OU4142xn5+1AswDiigvTHawmWSiDeMXeASzhNoNq6Y135jexcICmtaIJ50VQQhF1MUVmwU6mvWFvFancb0ku4BvAq/H3/BEgJJXWbNrT02KFD9I5Q5L1VLzn1CnAA31yFjFSjEZW3umI9gnI9mi297db0ipLmSVUWo0U319h8eSRD1rMZWsIjyiR+hria1mqHurgsZ7k6VOWCT7e0fYrJu8PGxu3f7ONafv3GaCDsn2X8G9s/zgg/fQvGNmzsx00QJDP+fdnigrdtsZ5u3ncmDEPe+XNSd1e6Elxchv5vtD9Uf42BwpLO8/wzWa0tdnfYvwBlcA1R3+VwOqqXc47MkELyZPpgbDS//JwQX8H0BgsI11VKB/IxGid7an6bt2VJ0veXNRdW4GjOQTfbIJjTrQRVYoW5f4x19N1YKjfpGhBqM3WSg0WxKFnYVdVqsoV6jLTRb0bS5RQ/GR5QmLFsHCJ2ukbT7hqzTA1nYT9Tp9496neGDZocRvWeL+dCD6hgWOVaQNI10mTqJ4+dBUXMHVj12kWX1Id+DmVtPIrPBVCw2YSdmcyxwT6gWzgkijDpQI7gM2+0UuRi1YpkbNM5dpUYjqbuRQaYOCLKHwUQcpkAk0xCdjHIifmcuqPT5DpjKw07EWhQ19R4Y46b3jpgZmHqQTRZnL8W9XOM2QWXBcQRCMJQD0ghGYXZ2FOKqH2WFyTgDbUTGpZTRbkf6Wgzr2xzftwuaWQfmSJGjaLjXRafmEQVJF+l46gYAAAAA') format('woff2'),
	  url('https://at.alicdn.com/t/iconfont.woff?t=1566039818041') format('woff'),
	  url('https://at.alicdn.com/t/iconfont.ttf?t=1566039818041') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	  url('https://at.alicdn.com/t/iconfont.svg?t=1566039818041#iconfont') format('svg'); /* iOS 4.1- */
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-dianhua:before {
	  content: "\e631";
	}
	
	.icon-biaoqian:before {
	  content: "\e60d";
	}
	
	
	 
	
	  /* 下面是tobar */
	   
	  #swiper-tab {
	    width: 100%;
	    position: sticky;
	    top: 0;
	    z-index: 999;
	  }
	   
	  .swiper-tab {
	    width: 100%;
	    padding-left: 5%;
		padding-right: 5%;
	    text-align: center;
	    line-height: 80upx;
	    background-color: white;
	    display: flex;
	  }
	   
	  .swiper-tab-list {
	    font-size: 25upx;
	    display: inline-block;
	    /* width: 25%; */
	    flex: 1;
	    color: #666;
	    border-bottom: 0upx;
	    position: relative;
	    text-align: center;
	  }
	   
	  .swiper-tab-list i {
	    position: absolute;
	    bottom: 30%;
	    right: 10%;
	    width: 0px;
	    height: 0px;
	    border: 5px solid #4e4e4e;
	    border-top-color: #4e4e4e;
	    border-bottom-color: transparent;
	    border-left-color: transparent;
	    border-right-color: transparent;
	  }
	   
	  .on {
	    color: #09C499;
	    border-bottom: 2upx solid #09C499;
	  }
	   
	  .on i {
	  
	    border: 5px solid #09C499;
	    border-top-color: #09C499;
	    border-bottom-color: transparent;
	    border-left-color: transparent;
	    border-right-color: transparent;
	  }
	   
	  .swiper-box {
	    display: block;
	    height: 100%;
	    width: 100%;
	    overflow: hidden;
	  }
	   
	  .swiper-box view {
	    text-align: center;
	  }
	   
	  .swiper-item {
	    background: #fff;
	    width: 100%;
	    display: none;
	    position: absolute;
	    top: 100upx;
	    z-index: 333333;
	    left: 0;
	    animation: displays 0.1s;
	  }
	   
	  .swiper-beijing {
	    width: 100%;
	    height: 200%;
	    background: #000;
	    opacity: 0.5;
	    position: absolute;
	    top: 130px;
	    left: 0;
	    display: none;
	    z-index: 888;
	    /* animation: 1s; */
	  }
	   
	   
	  /* 下拉切换中的切换 */
	   
	  .nav {
	    width: 20%;
	    height: 100upx;
	    float: left;
	    flex-direction: row;
	  }
	   
	  .default {
	    width: 100%;
	    line-height: 100upx;
	    text-align: center;
	    color: #000;
	    font-weight: bold;
	    font-size: 25upx;
	    overflow: hidden;
	  }
	   
	  
	   
	  
	  
	   
	  /*添加class改变样式  */
	   
	  .location_bottom {
	    width: 100%;
	    height: 400upx;
	    line-height: 140upx;
	    color: #d91f16;
	    font-size: 25upx;
	    padding: 0 20upx;
	    align-items: center;
	  }
	   
	  .add_city {
	    width: 90%;
	    display: block;
	    height: 70upx;
	    line-height: 70upx;
	    border-bottom: 2upx solid #ebebeb;
	    color: #000;
	    padding-left: 5%;
	  }
	   
	  .add_price {
	    width: 90%;
	    display: block;
	    height: 70upx;
	    line-height: 70upx;
	    border-bottom: 2upx solid #ebebeb;
	    color: #000;
	    padding-left: 5%;
	  }
	   
	  .add_amount {
	    width: 90%;
	    display: block;
	    height: 70upx;
	    line-height: 70upx;
	    border-bottom: 2upx solid #ebebeb;
	    color: #000;
	    padding-left: 5%;
	  }
	  
	  .add_type{
	    width: 90%;
	    display: block;
	    height: 70upx;
	    line-height: 70upx;
	    border-bottom: 2upx solid #ebebeb;
	    color: #000;
	    padding-left: 5%;
	  }
	   
	  .add_citying {
	    padding-left: 5%;
	    height: 70upx;
	    line-height: 70upx;
	    border-bottom: 2upx solid #09C499;
	    color: #09C499;
	  }
	  .add_priceing {
	    padding-left: 5%;
	    height: 70upx;
	    line-height: 70upx;
	    border-bottom: 2upx solid #09C499;
	    color: #09C499;
	  }
	  .add_amounting {
	    padding-left: 5%;
	    height: 70upx;
	    line-height: 70upx;
	    border-bottom: 2upx solid #09C499;
	    color: #09C499;
	  }
	  .add_typeing {
	    padding-left: 5%;
	    height: 70upx;
	    line-height: 70upx;
	    border-bottom: 2upx solid #09C499;
	    color: #09C499;
	  }
	  .list{
	    width: 100%;
	    padding:20upx 5%;
	    display: flex;
	    background: #fff;
	    border-top: 8upx solid #f5f5f5;
	  }
	  .list-left{
	    width: 20%;
	  }
	  .list-left-img{
	    width: 120upx;
	    height: 120upx;
	    border-radius: 50%;
	  }
	  .list-left-line{
	    width: 3upx;
	    height: 20upx;
	    background: #F3F3F3;
	    margin: auto;
	    margin-top: -10upx;
	  }
	  .list-left-phone{
	    width: 60upx;
	    height: 60upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto;
	    border: 5upx solid #F3F3F3;
	    border-radius: 50%;
	  }
	  .icon-dianhua{
	    color: #09C499;
	  }
	  .list-center{
	    margin-left: 40upx;
	    width: 30%;
	  }
	  .list-name{
	    margin-top:10upx;
	    font-size: 30upx;
	    /* font-weight: bold; */
	    color: #515151;
	  }
	  .list-time{
	    font-size: 25upx;
	    margin-top: 20upx;
	    color: #515151;
	  }
	  .list-num{
	    display: flex;
	    margin-top: 20upx;
	  }
	  .list-num-jiedan-text{
	    font-size: 22upx;
	    color: #C6C6C6;
	  }
	  .list-num-jiedan-number{
	    margin-top: 5upx;
	    font-size: 25upx;
	    text-align: center;
	    color: #515151;
	  }
	  .list-num-tuidan{
	    margin-left: 20upx;
	  }
	  .list-num-tuidan-text{
	    font-size: 22upx;
	    color: #C6C6C6;
	  }
	  .list-num-tuidan-number{
	    margin-top: 5upx;
	    font-size: 25upx;
	    text-align: center;
	    color: #515151;
	  }
	  .list-right{
	    width: 50%;
	    position: relative;
	  }
	  .icon-biaoqian{
	    font-size: 80upx;
	    color:#71E3C9;
	    margin-top: -20upx; 
	    position: absolute;
	    right: 8%;
	  }
	  .list-score{
	    position: absolute;
	    font-size: 25upx;
	    top: 20upx;
	    color: #fff;
	    right: 30%;
	  }
	  .list-yuyue{
	    position: absolute;
	    bottom: 20upx;
	    right: 5%;
	    font-size: 28upx;
	    border: 5upx solid #F6F7FF;
	    height: 50upx;
	    width: 100upx;
	    line-height: 50upx;
	    border-radius: 25upx;
	    color: #09C499;
	    text-align: center;
	  }
</style>
