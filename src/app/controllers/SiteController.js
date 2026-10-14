const Course=require('../models/Course');

class SiteController {
    
    // get home 
    async index(req, res, next){
        try {
            const courses = await Course.find({});
            return res.json(courses);
        } catch (err) {
            return next(err);
        }
    }
    // get search 
    search(req, res){
        res.render('search');
    }
}

module.exports = new SiteController();
