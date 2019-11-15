// const apiUrl = 'http://localhost:8080'
const apiUrl = 'http://192.168.1.119:8080'
// const apiUrl = 'http://192.168.1.116:8081'
// const apiUrl = 'https://www.sxscott.com/housework'

module.exports = {
	api: {
		//登录授权
		jwtLoginUrl:`${apiUrl}/user/jwtLogin`,
		//轮播图
		getBannerListUrl:`${apiUrl}/banner/getList`,
		//保洁推荐
		cleanRecommendListUrl:`${apiUrl}/cleanRecommend/getList`,
		//发送模板消息
		sendTempleMsg:`${apiUrl}/userForm/message`,
		//收集formId
		getFormId:`${apiUrl}/userForm/insertForm`,
		//字段获取字典
		dictDetailUrl:`${apiUrl}/dict/seletAll`,
		//获取新闻公告
		getNewsUrl:`${apiUrl}/news/getList`,
		//获取订单列表
		getOrderList:`${apiUrl}/pay/payOrder`,
		//更新订单状态
		updateOrderState:`${apiUrl}/pay/payOrder`,
		//获取订单详情
		getOrderDetail:`${apiUrl}/pay/payOrder/`,
		//获取保洁员
		getCleanerList:`${apiUrl}/cleaner/findCleaners`,
		//获取保洁员详细信息
		getCleanerDeail:`${apiUrl}/cleaner/loadCleanerById`,
		//获取保洁员排班信息
		getCleanerWork:`${apiUrl}/cleaner/cleanerWork`,
		//设置保洁员排班
		setCleanerWork:`${apiUrl}/cleaner/updateCleanerWorkDetail`,
		//试卷列表
		getTestList:`${apiUrl}/test/selecteByMap`,
		//考核通过
		submit:`${apiUrl}/test/submit`,
		}
}
