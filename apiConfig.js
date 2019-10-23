// const apiUrl = 'http://localhost:8080'
const apiUrl = 'http://192.168.1.181:8080'
// const apiUrl = 'http://192.168.1.116:8081'
// const apiUrl = 'https://www.sxscott.com/housework'

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
		}
}
