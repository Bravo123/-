var express = require('express');
var router = express.Router();
var UserModel = require('../model/UserModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', {});
});

router.post('/login', function(req, res, next) {
  	UserModel.find({username: req.body.username, psw: req.body.psw}, function(err, docs) {
  		var result = {
  			code: 1,
        message: '登录成功'
  		}
  		if(err || docs.length == 0) {
  			result.code = -1;
  			result.message = "登录失败";
  		} else {
        req.session.username = req.body.username;
      }
       res.send(JSON.stringify(result));
  		
  	})
});



module.exports = router;
