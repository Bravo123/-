var express = require('express');
var router = express.Router();
var studentModel = require('../model/studentModel');
var topicModel = require('../model/topicModel');
var newsModel = require('../model/newsModel');
/* GET home page. */
router.get('/', function(req, res, next) {
	// if(!req.session.username) {
	// 	res.render("login", {});
	// 	return;
	// }
	topicModel.find({}, function(err, docs) {
		if(err || docs.length == 0) {
			res.render("main", {topicList: []});
		} else {
			res.render("main", {topicList: docs});
		}
	});
});

router.get('/topic_details', function(req, res, next) {
	newsModel.find({topicId: req.query.id}, {'des': 1, 'name': 1, 'date': 1, 'summary': 1, 'img': '1', 'newsId': 1, 'article': 1, 'key': 1, 'video': 1}, function(err, docs) {
		if(err || docs.length == 0) {
			res.render('topic_details', {news: []});
		} else {
			res.render('topic_details', { news: JSON.parse(JSON.stringify(docs)) });
		}
	});
});

router.get('/news', function(req, res, next) {
	newsModel.find({newsId: req.query.newsId}, function(err, docs) {
		if(err || docs.length == 0) {
			res.render('news', {news: []});
		} else {
			res.render('news', {news: JSON.parse(JSON.stringify(docs))});
		}
	});
});

router.post('/commit', function(req, res, next) {
	let id = req.body.newsId, 
		content = req.body.content,
		username = req.body.username,
		news = {};
		console.log(id, content, username);
	newsModel.findOne({newsId: id}, function(err, docs) {
		news = docs; 
		news.comment.push({'username': username, 'date': new Date().toLocaleString(), 'comment': content});
		newsModel.update({'newsId': id}, news, function(err, docs) {
			if (err) {
				console.error(err);
			}
			console.log(news);
			res.send(JSON.parse(JSON.stringify(docs)));
			// res.render('news',  {news: JSON.parse(JSON.stringify(docs))});
		});
	});
})

router.post('/del', function(req, res, next) {
	let result = {
		message: "删除成功"
	};
	studentModel.update({id: req.body.id}, {$set:{del: "true"}}, function(err, docs) {
		if(err) {
			result.message = "删除失败";
		}
	});
	res.send(JSON.stringify(result));
});

router.get('/edit', function(req, res, next) {
	studentModel.find({id: req.query.id}, function(err, docs) {
		if(err || docs.length == 0) {
			res.send("没有数据");
		} else {
			res.render('edit', {student: docs[0]});
		}
	});
});

router.post('/save', function(req, res, next) {
	let result = {
		code: 1,
		message: "更新成功"
	};
	studentModel.update({id: req.body.id}, req.body , function(err, docs) {
		if(err) {
			result.code = -1;
			result.message = "更新失败";
		}
	});
	res.send(JSON.stringify(result));
});


module.exports = router;
