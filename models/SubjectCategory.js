const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = SubjectCategory = mongoose.model('subject_categories', SubjectCategorySchema);