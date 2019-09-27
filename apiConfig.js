// const apiUrl = 'http://localhost:8080'
// const apiUrl = 'http://192.168.1.103:8080'
const apiUrl = 'http://192.168.1.116:8081'

module.exports = {
	api: {
		//登录授权
		jwtLoginUrl:`${apiUrl}/user/jwtLogin`,
		//字段获取字典
		dictDetailUrl:`${apiUrl}/dict/seletAll`,
		//获取新闻公告
		getNewsUrl:`${apiUrl}/news/getList`
	}
}
