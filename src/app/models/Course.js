const mongoose=require('mongoose');
const { default: _default } = require('slugify');
const Schema=mongoose.Schema;


const Course=new Schema({
    name: {type:String, maxLength:255},
    description: {type:String, maxLength:600},
    image: {type:String, maxLength:255},
    slug : {type: String},
    videoId : {type: String, required: true},
    level : {type: String},
    deletedAt: {type:Date, default: null}
}, {
    timestamps: true,
});

module.exports=mongoose.model('Course', Course); 
