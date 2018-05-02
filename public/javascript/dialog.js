// dialog 弹窗

function showDialog() {
	let div = $('<div></div>');
	$('body').append(div);
	div.css({
		'position': 'fixed',
		'top': '',
		'width': '50%',
		'height': '50%'
	});
}