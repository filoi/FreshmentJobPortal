const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCatSchema = new Schema({
    name: {type: String,required: true},
    code: {type: String, required: true},
    description: {type: String, required: false},
    status:{ type:String, required:false},
    date: {  type: Date, default: Date.now}
});

module.exports = Sub_Category = mongoose.model('Sub_category', SubCatSchema);