const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
    name: {type: String,required: true},
    mobileno: {type: String, required: true},
    email: {type: String, required: true},
    code:{ type:String, required:true},
    year:{ type:String, required:true},
    //value:{ type:Array, required:true},
    status:{ type:String, required:false},
    university_id: { type:mongoose.Schema.Types.ObjectId,ref :'University', required: true},
    date: {  type: Date, default: Date.now}
});


module.exports = College = mongoose.model('College', CollegeSchema);