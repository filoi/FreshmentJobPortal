const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobileno: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    college:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    paymentstatus:{
        type:String
    },
    paymentemail:{
        type:String
    },
    currentstatus:{
        type:String
    },
    profilestatus:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('enrollment', EnrollmentSchema);