const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UniversitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobileno: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:true
    },
    affiliated:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = University = mongoose.model('university', UniversitySchema);