const Course=require('../models/Course');
const {mongooseToObject, multiMongooseToObject}=require('../../util/mongoose');
const slugify = require('slugify');
class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next){
        
        let courseQuery=Course.find({deletedAt : null});

        if (Object.hasOwn(req.query, '_sort')){
            courseQuery=courseQuery.sort({
                [req.query.column]: req.query.type,
            })
        }
        Promise.all([courseQuery, 
            Course.countDocuments({
            deletedAt: {$ne: null},})
        ])
            .then(([courses, trashCount])=>res.render('me/stored-courses', {
                trashCount,
                courses : multiMongooseToObject(courses)
            }))
            .catch((next));

        
        
    }
    trashCourses(req, res, next){
        Course.find({ deletedAt: { $ne: null } })
        .sort({ deletedAt: -1 })
            .then(courses=>res.render('me/trash-courses', {
                courses : multiMongooseToObject(courses)
            }))
            .catch(err=>next(err));
    }
}

module.exports = new MeController();
