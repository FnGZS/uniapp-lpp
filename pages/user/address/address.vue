<template>
	<view id='address'>
	  <view class='addressList' v-for="(item,index) in addressList"  :key="key">
		<view class='address-pos'>
		  <view class='address-pos-isDefault' v-if="item.isDefault == 1">默认</view>
		  <view class='address-pos-address'> {{item.address}}</view>
		</view>
		<view class='address-bottom'>
		  <view class='address-name'>{{item.name}}</view>
		  <view class='address-phone'>{{item.telephone}}</view>
		</view>
		<view class='iconfont icon-edit' :data-detail='item' @tap='toAddressEdit'></view>
	  </view>
	  <view class='add-btn'  @tap='toAddAddress'>
		<view class='iconfont icon-xinzeng'></view>
		<view class='add-btn-text'>新增地址</view>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId:null,
				addressList:[{id: 65, userId: 0, name: "钟佳闱", telephone: "17857058385", address: "康新花园A座1108", isDefault: 1},
				{id: 50, userId: 0, name: "钟佳闱", telephone: "17857058385", address: "北区11幢236", isDefault: 0}]
			}
		},
		onLoad() {
		},
		methods: {
			 //新增地址
			  toAddAddress:function(){
				uni.navigateTo({
				  url: '../address/addressAdd',
				})
			  },
			  //修改地址
			  toAddressEdit:function(e){
				console.log(e)
				var detail = JSON.stringify(e.currentTarget.dataset.detail) ;
				uni.navigateTo({
				  url: '../address/addressEdit?detail=' + detail,
				})
			  },
		}
	}
</script>

<style>
	
	@font-face {font-family: "iconfont";
	  src: url('https://at.alicdn.com/ticonfont.eot?t=1545567307073'); /* IE9*/
	  src: url('https://at.alicdn.com/ticonfont.eot?t=1545567307073#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAUQAAsAAAAAB5gAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY8ekgSY21hcAAAAYAAAABUAAABhmTS0NVnbHlmAAAB1AAAAUoAAAGA14CIw2hlYWQAAAMgAAAALwAAADYTqn6UaGhlYQAAA1AAAAAcAAAAJAfeA4RobXR4AAADbAAAAAwAAAAMDAAAAGxvY2EAAAN4AAAACAAAAAgASADAbWF4cAAAA4AAAAAfAAAAIAESAFZuYW1lAAADoAAAAUUAAAJtPlT+fXBvc3QAAAToAAAAJwAAADhADEVBeJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWCcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGByesTxTYG7438AQw9zA0AAUZgTJAQDf2QwHeJztkLERgDAMA19JSMExREoKBqJifNYIigNboLu3bDlpDCxANocpoAsxdDpV5Jk18hJvql2ku9ytd/jcknfVnsY/VX5tUfd3SuNak+jbBD3W7A3WeJxVjz1Ow0AQhfd5HceOJZzFP0uKWPIabBBRghzHlhIRAx2IAlFQcwIKJO7BDUBKqlQUHCANjXMCp+IiMWyAhilmNKM3n94jCpFFn+kuMckJIdhB0wefIu/DdrRjuPIQ9hGPQhGdIs0mGE0xQeJxd5h4XSjWvFLVaj5bq+r63tRLmPq+bqLUzX8LZWo1+5NW9aNhlkYLaBmlaUjFaqteSTFpEPK1pEt6Tmzik4AckEvpKhogCkUTFjSvgJvkyGLuuY6FOM885DyPwWkgohFLs2GQZGkUBtI5k1kCGYalkdBc5mh0ib2jTtC16zulR932C1WwsJ+EpvKCN9r1WXucFQin/uaNcc5wv+31gx8Dsa+8y8kF58pH0DnsSIb6anm0B8lwLoRmNBtbCmr3ajwoIIrNgjPlRiIEl++b618Mbn+gn4wT8g0tP0RwAAB4nGNgZGBgAOI9yu+K4vltvjJwszCAwA3Xud4I+v8BFgZmRyCXg4EJJAoAKlwKCwB4nGNgZGBgbvjfwBDDwgACQJKRARUwAwBHCQJsBAAAAAQAAAAEAAAAAAAAAABIAMB4nGNgZGBgYGbwYmBlAAEmIOYCQgaG/2A+AwAQSAFpAHicZY9NTsMwEIVf+gekEqqoYIfkBWIBKP0Rq25YVGr3XXTfpk6bKokjx63UA3AejsAJOALcgDvwSCebNpbH37x5Y08A3OAHHo7fLfeRPVwyO3INF7gXrlN/EG6QX4SbaONVuEX9TdjHM6bCbXRheYPXuGL2hHdhDx18CNdwjU/hOvUv4Qb5W7iJO/wKt9Dx6sI+5l5XuI1HL/bHVi+cXqnlQcWhySKTOb+CmV7vkoWt0uqca1vEJlODoF9JU51pW91T7NdD5yIVWZOqCas6SYzKrdnq0AUb5/JRrxeJHoQm5Vhj/rbGAo5xBYUlDowxQhhkiMro6DtVZvSvsUPCXntWPc3ndFsU1P9zhQEC9M9cU7qy0nk6T4E9XxtSdXQrbsuelDSRXs1JErJCXta2VELqATZlV44RelzRiT8oZ0j/AAlabsgAAAB4nGNgYoAALgbsgJmRiZGZkYWBvSIzryo1L50lNSWzhIEBACzOBNAA') format('woff'),
	  url('https://at.alicdn.com/ticonfont.ttf?t=1545567307073') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
	  url('https://at.alicdn.com/ticonfont.svg?t=1545567307073#iconfont') format('svg'); /* iOS 4.1- */
	}
	
	.iconfont {
	  font-family:"iconfont" !important;
	  font-size:16px;
	  font-style:normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-xinzeng:before { content: "\e620"; }
	
	.icon-edit:before { content: "\e604"; }
	
	
	
	
	#address{
	  width: 100%;
	  padding-bottom: 80rpx;
	}
	.addressList{
	  margin-left: 5%;
	  padding-top: 20rpx;
	  padding-bottom: 20rpx;
	  position: relative;
	  border-bottom: 1rpx solid #E5E5E5;
	
	}
	.address-pos{
	  font-size: 28rpx;
	  width: 80%;
	  display: flex;
	}
	.address-pos-isDefault{
	  font-size: 20rpx;
	  height: 30rpx;
	  padding-left: 10rpx;
	  padding-right: 10rpx;
	  line-height: 30rpx;
	  background: #F4A460;
	  text-align: center;
	  color: #fff;
	  margin-right: 20rpx;
	  margin-top: 8rpx;
	}
	.address-bottom{
	  font-size: 23rpx;
	  color: #A9A9A9;
	  display: flex;
	}
	.address-name{
	  margin-right: 20rpx;
	}
	.icon-edit{
	  position: absolute;
	  right: 5%;
	  top: 50%;
	  font-size: 38rpx;
	  width: 50rpx;
	  height: 50rpx;
	  margin-top: -30rpx;
	  line-height: 50rpx;
	}
	.add-btn{
	  position: fixed;
	  width: 100%;
	  height: 80rpx;
	  background: #3598DC ;
	  bottom: 0;
	  text-align: center;
	  line-height: 80rpx;
	  color: #fff;
	  font-size: 25rpx;
	  display: flex;
	  justify-content: center;
	}
	.add-btn-text{
	  margin-left: 10rpx;
	}
</style>
