const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const CourseSchema=new Schema({
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
//Custom query helpers
CourseSchema.query.sortable=function(req){
    if (Object.hasOwn(req.query, '_sort')){
            const isValidType = ['asc', 'desc'].includes(req.query.type) ;
            return this.sort({
                [req.query.column]: isValidType ? req.query.type : 'asc'
            })
        }
    return this;
};
module.exports=mongoose.model('Course', CourseSchema); 
