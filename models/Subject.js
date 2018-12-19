const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    name:{type:String, required:true},
    code:{type:String, required:true},
    max_marks:{type:String, required:false},
    sub_category_id:{type:mongoose.Schema.Types.ObjectId,ref :'Sub_Category', required: true},
    status:{type:String, required:false},
    date:{type:Date, default:Date.now}
});

module.exports = Subject = mongoose.model('Subject', SubjectSchema);