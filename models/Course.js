const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name:{type:String, required:true},
    coursecode:{type:String, required:true},
    duration:{type:String, required:false},
    specialization:{type:String, required:false},
    marking_criteria:{type:String, required:false},  // marks or grade
    academic_term:{type:String, required:false}, //semester trimester yearly
    status:{type:String, required:false},
    date:{type:Date, default:Date.now}
});

module.exports = Course = mongoose.model('Course', CourseSchema);