const Course=require('../models/Course');
const {multiMongooseToObject}=require('../../util/mongoose');
class SiteController {
    
    // get home 
    async index(req, res, next){
        Course.find({})
        .then(courses=> {
            // fix bug: document  to normal object
            
            res.render('home', {
                courses: multiMongooseToObject(courses)
            });
        })
        .catch(err=> next(err));
    }
    // get search 
    search(req, res){
        res.render('search');
    }
}

module.exports = new SiteController();
