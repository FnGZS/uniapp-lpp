<template>
	<view id="rule">
		<view v-for="(item,index) in list" :key="key">
			<view class="title">{{item.title}}</view>
			<view class="content">{{item.content}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{title: "法律声明",content: `访问、浏览或使用哈哕出行平台(包括“哈哕”基础信息平台App,以及“哈哕”单车车信息平台、“ 哈哕”助力车信息平台、“哈哕”电动车信息平台、“ 哈哕”驿站信息平台等)，以下统称”哈哕”，表明您已阅读、理解并同意接:受以下条款的约束，并遵守所有适用的法律和法规。您一旦使用哈哕，则须秉着诚信的原则遵守以下条款。`},
					{title: "一般原则",content: `以下规则适用于所有哈哕用户或浏览者，因业务政策调整，可能随时被修改。您应经常访问本页面以了解当前的条款，因为这些条款与您密切相关。这些条款的某些条文也可能被哈哕平台中某些页面,上或某些具体服务明确指定;的法律通告或条款所取代，您应该了解这些内容，一旦接受本条款，即意味着您已经同时详细阅读并接受了这些被引用用或取代的条款。`},
					{title:'责任限制声明',content:`不论在何种情况下，哈哕对由于信息网络设备维护、信息网络连接故障、智能终端、通讯或其他系统的故障、电力故障、罢工、劳动争议、暴乱、起义、骚乱、火灾、洪水、风暴、爆炸、战争、政府行为、司法行政机关的命令、其他不可抗力或第三方的不作为而造成的不能服务或延迟服务不承担责任。`},
					{title:'用户信息',content:`为哈哕提供相应服务之必须，您需要仔细阅读“哈哕”《个人信息保护及隐私政策》，并授权哈哕按照《个人信息保护及隐私政策》的约定使用您的个人信息。同时，为能更好的给您提供网络服务，以最便利、最全面的实现您的多方位需求，哈哕与其合作网络服务平台提供互补性服务，为实现该服务功能的正常运行，哈哕与合作平台在用户同意的情况下将共享必要的用户信息。哈哕对于共享用户实行相同的信息安全和用户隐私政策，并监督合作网络服务平台遵守不低于哈哕信息安全和用户隐私政策标准的安全和隐私政策。`}
				]
			}
		},
		onLoad() {
		},
		methods: {
		}
	}
</script>

<style>
	page{
		background: #fff;
	}
	#rule{
		margin-bottom: 50upx;
	}
	.title{
		margin-left: 5%;
		margin-bottom: 10upx;
		width: 90%;
		font-size: 30upx;
		font-weight: bold;
		margin-top: 50upx;
	}
	.content{
		margin-left: 5%;
		margin-right: 5%;
		width: 90%;
		font-size: 28upx;
	}
</style>
