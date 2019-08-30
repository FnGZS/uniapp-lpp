<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>
 
<script>
	import {sendAjax} from '@/common/sendAjax.js';
	import config from '@/apiConfig.js'
	const { getAllUrl } = config.api
	export default {
		data() {
			return {
				title: 'Hello miss dj ilove you '
			}
		},
		onLoad() {
			let that = this
			let infoOpt = {
				url: getAllUrl,
				type: 'POST',
				data: {
				}
			}
			let infoCb = {}
			infoCb.success = function(res) {
				console.log(res.list);
				that.title = res.list[0].k
			}
			
			sendAjax(infoOpt, infoCb);
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
