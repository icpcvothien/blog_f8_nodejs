const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const Course=new Schema({
    name: {type:String, maxLength:255},
    description: {type:String, maxLength:600},
    image: {type:String, maxLength:255},
    slug : {type: String},
    videoId : {type: String, required: true},
    level : {type: String}
}, {
    timestamps: true,
});

module.exports=mongoose.model('Course', Course); 
