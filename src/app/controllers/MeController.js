const Course=require('../models/Course');
const {mongooseToObject, multiMongooseToObject}=require('../../util/mongoose');
const slugify = require('slugify');
class MeController {
    
    // [GET] /me/stored/courses
    storedCourses(req, res, next){
        Course.find({deletedAt : null})
            .then(courses=>res.render('me/stored-courses', {
                courses : multiMongooseToObject(courses)
            }))
            .catch(err=>next(err));
        
    }

}

module.exports = new MeController();
