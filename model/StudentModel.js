var mongoose = require("mongoose");
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
//学生信息表
const Student = new Schema({
 id:  String,
 name: String,
 age: Number,
 sex: String,
 class: String,
 del: String,
 date: { type: Date, default: Date.now }
});

const StudentModel = mongoose.model('students', Student);

module.exports = StudentModel;