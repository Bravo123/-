$('.comment').on('click', () =>  {
	//注册 => 评论 => 刷新评论列表
	let $dialog = $('.dialog');
	let $mask = $('.mask');
	let $registerWrapper = $('.register-wrapper');
	let $loginWrapper = $('.login-wrapper');
	let $commitWrapper = $('.commit-wrapper');
	let $tip = $('.tip');
	$dialog.removeClass('hide');
	$mask.removeClass('hide');
	$mask.on('click', () => {
		$dialog.addClass('hide');
		$mask.addClass('hide');
	});

	let localUsername = localStorage.getItem('username');
	let isLogined = localStorage.getItem('isLogined');
	if (localUsername && isLogined) {
		$tip.text('快来留下你的评论吧~');
		$commitWrapper.removeClass('hide');
		$('.commit').on('click', () => {
			goCommit();
		});	
	} else if (localUsername && !isLogined) {
		$tip.text('快来登入吧~');
		$loginWrapper.removeClass('hide');
		$('.login').on('click', () => {
			goLogin();
		});	
	} else {
		$tip.text('快去注册吧~');
		$registerWrapper.removeClass('hide');
		$('.commit').on('click', () => {
			goCommit();
		});	
	}

	$('.register').on('click', () => {

	});

	$('.login').on('click', () => {

	});

	$('.commit').on('click', () => {

	});
});

function commit(content) {
	$.ajax({
		url: '/menu/commit',
		type: 'post',
		data: {
			content: content,
			newsId: $('.wrapper').data('id'),
			username: localStorage.getItem('username')
		},
		success: function(res) {
			alert('评论成功');
			location.reload();
		}
	})
}

function register(username, password) {
	$.ajax({
		url: '/users/register',
		type: 'post',
		data: {
			username: username,
			pwd: password
		},
		dataType: "json",
		success: function(res) {
			if(res.code != 1) {
				alert(res.message);
				return;
			}  else {
				// 注册成功
				localStorage.setItem('username', username);
				// 自动登录
				$.ajax({
					url: '/users/login',
					type: 'post',
					data: {
						username: username,
						pwd: password
					},
					dataType: "json",
					success: function(res) {
						if (res.code != 1) {
							alert('登入失败');
							return;
						} else {
							localStorage.setItem('isLogined', true);
							location.href = location.href;
						}
					}
				});
			}
		}
	})
}

function login(username, password) {
	$.ajax({
		url: '/users/login',
		type: 'post',
		data: {
			username: username,
			pwd: password
		},
		dataType: "json",
		success: function(res) {
			if (res.code != 1) {
				alert('登入失败');
				return;
			} else {
				localStorage.setItem('isLogined', true);
				location.href = location.href;
			}
		}
	});
}

function goCommit() {
	let $commitContentValue = $('#commit_content').val();
	if (!$commitContentValue) {
		alert('不能提交空的评论哦');
		return;
	}
	commit($commitContentValue);
} 

function goRegister() {
	let username = $('#reg_username').val();
	let password = $('#reg_pwd').val();
	if (!username) {
		alert('用户名不能为空');
		return;
	}
	if (password && password.length >= 6) {
		register(username, password);
	} else {
		alert('密码不能为空或者是少于6位');
		return;
	}
}

function goLogin() {
	let username = $('#login_username').val();
	let password = $('#login_pwd').val();
	if (!username) {
		alert('用户名不能为空');
		return;
	}
	if (password && password.length >= 6) {
		login(username, password);
	} else {
		alert('密码不能为空或者是少于6位');
		return;
	}
}

