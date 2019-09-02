const apiUrl = 'http://localhost:8080'
module.exports = {
	api: {
		//登录授权
		jwtLogin:`${apiUrl}/user/jwtLogin`,
		//登录
		userLoginUrl:`${apiUrl}/user/login`,
		//获取所有列表
		getAllUrl: `${apiUrl}/dict/getAll`
	}
}
