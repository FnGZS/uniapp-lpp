import {
	sendAjax
} from '@/common/js/sendAjax.js'
import config from '@/apiConfig.js'
const {
	jwtLoginUrl
} = config.api

function login(callback, first) {
	if (!callback) {
		callback = {}
	}
	var firstLogin = first ? false : true
	var that = this;
	const bcallback = callback.beforeSend || function(data) {};
	const scallback = callback.success || function(data) {};
	// 登录
	bcallback()
	uni.login({
		success: resp => {
			uni.getSetting({
				success: res => {
					if (res.authSetting['scope.userInfo']) {
						if (firstLogin) {
							uni.getUserInfo({
								success: userResult => {
									var platUserInfoMap = {};
									platUserInfoMap["encryptedData"] = userResult.encryptedData;
									platUserInfoMap["iv"] = userResult.iv;
									//登录请求
									let infoOpt = {
										url: jwtLoginUrl,
										type: 'POST',
										data: {
											platCode: resp.code,
											platUserInfoMap
										}
									}
									let infoCb = {}
									infoCb.success = function(res) {
										res.user.token = res.token
										console.log(res)
										uni.setStorageSync("userInfo", res.user)
										uni.setStorageSync("userDetail", res.userDetail)
										scallback(res.user)
									}
									sendAjax(infoOpt, infoCb,1);
								}
							})
						}
					} else {
						uni.setStorageSync("userInfo", '')
					}
				}
			})
		}
	})
}
export {
	login
}
