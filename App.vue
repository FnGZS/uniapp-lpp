<script>
export default {
	onLaunch: function() {},
	onShow: function() {},
	onHide: function() {}
};
</script>

<style>
@import 'colorui/main.css';
@import 'colorui/icon.css';
@import './common/styles/aliicon.css';
/* 公共title */
.public-title {
	width: 750upx;
	height: 92upx;
	padding-left: 30upx;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.public-box {
	width: 720upx;
	padding-left: 13upx;
	font-weight: bold;
}
.public-leftLine {
	width: 8upx;
	height: 32upx;
	background: #3598dc;
	border-radius: 4upx;
}
.sub {
	width: 675upx;
	height: 82upx;
	background: #3598dc;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 28upx;
	color: #fff;
	position: fixed;
	bottom: 26upx;
	left: 0;
	right: 0;
	margin: auto;
}

</style>
