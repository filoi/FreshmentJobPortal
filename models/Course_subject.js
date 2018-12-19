const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    course_id:{type:mongoose.Schema.Types.ObjectId,ref :'Course', required: true},
    subject_id:{type:mongoose.Schema.Types.ObjectId,ref :'Subject', required: true},
    date:{type:Date, default:Date.now}
});

module.exports = Subject = mongoose.model('Course_subject', SubjectSchema);