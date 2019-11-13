<template>
	<view class="content">
		<image @click="toInfo" src="/static/img/cleanerTop.jpg" mode=""></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	onLoad() {},
	methods: {
		toInfo(){
			uni.navigateTo({
				url:'./info'
			})
		}
	},
	
};
</script>

<style scoped="true" lang="scss">
.content {
	width: 100vw;
	height: 100vh;
	position: relative;
	image {
		width: 100%;
		height: 100%;
	}
}
</style>
