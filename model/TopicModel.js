var mongoose = require("mongoose");
const Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
const Topic = new Schema({
	id: String,
	name: String,
	des: String,
	subtitle: String,
	img: String,
	content: String,
	date: { type: Date, default: Date.now }
});

const TopicModel = mongoose.model('topics', Topic);

module.exports = TopicModel;