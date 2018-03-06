var express = require('express');
var router = express.Router();
var studentModel = require('../model/studentModel')
/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.session.username) {
		res.render("login", {});
		return;
	}
	studentModel.find({}, function(err, docs) {
		if(err || docs.length == 0) {
			res.render("menu", {studentList: []});
		} else {
			res.render("menu", {studentList: docs});
		}
	});
});

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
