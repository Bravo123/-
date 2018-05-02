var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserModel = require('../model/UserModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("main", {topicList: []});
});

router.post('/login', function(req, res, next) {
  	UserModel.find({username: req.body.username, pwd: req.body.pwd}, function(err, docs) {
			var result = {}
  		if(err || docs.length == 0) {
  			result.code = -1;
  			result.message = "登录失败";
  		} else {
				result = {
					code: 1,
					message: '登录成功'
				}
        // req.session.username = req.body.username;
      }
      res.send(JSON.stringify(result));
  	})
});

router.post('/register', function(req, res, next) {
	UserModel.create({username: req.body.username, pwd: req.body.pwd}, function(err, docs) {
		var result = {}
		if(err || docs.length == 0) {
			result.code = -1;
			result.message = "登录失败";
		} else {
			result = {
				code: 1,
				message: '登录成功'
			}
			// req.session.username = req.body.username;
		}
		res.send(JSON.stringify(result));
	})
});



module.exports = router;
