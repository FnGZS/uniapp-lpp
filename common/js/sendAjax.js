
//请求模板

// let infoOpt = {
// 	url: '',
// 	type: 'POST',
// 	data: {
// 	}
// }
// let infoCb = {}
// infoCb.success = function(res) {
// 	console.log(res);
// }
// 
// sendAjax(infoOpt, infoCb);















function sendAjax(options, callback,type) {
	const _sets = options
	if (typeof _sets.type === 'undefined') {
		_sets.type = 'POST'
	}
	if (typeof _sets.data === 'undefined') {
		_sets.data = {}
	}
	// method大写
	_sets.type = _sets.type.toUpperCase();
	//执行之前
	const bcallback = callback.beforeSend || function(data) {};
	//成功回调
	const scallback = callback.success || function(data) {};
	//执行回调
	const ccallback = callback.complete || function(data) {};

	bcallback()
	uni.request({
		url: _sets.url,
		method: _sets.type,
		data: _sets.data,
		header: {
			'content-type': type?'application/json':'application/x-www-form-urlencoded',
			'Authorization': "Bearer " + (uni.getStorageSync('userInfo') !== '' ? uni.getStorageSync('userInfo').token : '')
		},
		success(res) {
			if (res.data.code == 200) {
				scallback(res.data.data)
			} else{
				uni.showModal({
					title: '提示',
					content: res.data.message || '处理失败',
					showCancel: false
				});
			}
		},
		fail() {
			uni.showModal({
				title: '提示',
				content: '服务器连接失败',
				showCancel: false
			});
		},
		complete() {
			ccallback()
		}
	})
}

export {
	sendAjax
}
