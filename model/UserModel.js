var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var User = new Schema({
    username : String,
    pwd      : String
});

var UserModel = mongoose.model('users', User);

module.exports = UserModel;