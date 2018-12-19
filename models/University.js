const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UniversitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobileno: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:false
    },
    affiliated:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = University = mongoose.model('University', UniversitySchema);