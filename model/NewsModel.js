var mongoose = require("mongoose");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
//消息表
const News = new Schema({
	topicId:  String,
	newsId: String,
	date: String,
    img: String,
	summary: String,
	des: String,
    name: String,
	content: String,
	key: String,
	comment: Array
});

const NewsModel = mongoose.model('news', News);

module.exports = NewsModel;