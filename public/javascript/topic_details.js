// tab切换
let $tabTl = $('.tab-tl');
let $tabAc = $('.tab-ac');
let $tabVd = $('.tab-vd');
let $topicList = $('.topic-list');
let $article = $('.article');
let $video = $('.video');

function tabChange($tab, $content) {
	$tabTl.siblings().removeClass('active');
	$tabTl.siblings().find('span').removeClass('active');
	$tabTl.removeClass('active');
	$tabTl.find('span').removeClass('active');
	$tab.addClass('active');
	$tab.find('span').addClass('active');
	$topicList.addClass('hide');
	$article.addClass('hide');
	$video.addClass('hide');
	$content.removeClass('hide');
}
$tabTl.on('click', () => {
	tabChange($tabTl, $topicList);
});

$tabAc.on('click', () => {
	tabChange($tabAc, $article);
});

$tabVd.on('click', () => {
	tabChange($tabVd, $video);
});

$('.comment').on('click', () => {
	// 发表评论
});

$('.return-topic').on('click', () => {
	location.href = '/';
});
