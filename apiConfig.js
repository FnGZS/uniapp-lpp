// const apiUrl = 'http://localhost:8080'
// const apiUrl = 'http://192.168.1.181:8080'
// const apiUrl = 'http://192.168.1.116:8081'
const apiUrl = 'https://www.sxscott.com/housework'

module.exports = {
	api: {
		//登录授权
		jwtLoginUrl:`${apiUrl}/user/jwtLogin`,
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
		getCleanerList:`${apiUrl}/cleaner/findMenus`,
		//获取保洁员详细信息
		getCleanerDeail:`${apiUrl}/cleaner/loadCleanerById`,
		//获取保洁员排班信息
		getCleanerWork:`${apiUrl}/cleaner/cleanerWork`
		}
}
