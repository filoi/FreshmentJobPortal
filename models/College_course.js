const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
    course_id: { type:mongoose.Schema.Types.ObjectId,ref :'Course', required: true},
    college_id: { type:mongoose.Schema.Types.ObjectId,ref :'College', required: true},
    date: {  type: Date, default: Date.now}
});


module.exports = College = mongoose.model('College_course', CollegeSchema);