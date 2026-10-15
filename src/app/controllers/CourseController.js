const Course=require('../models/Course');
const {mongooseToObject}=require('../../util/mongoose');
const slugify = require('slugify');
class CourseController {
    
    // get show
    show(req, res, next){
        Course.findOne({
            slug : req.params.slug
        })
            .then(course=>{
                res.render('courses/show', {
                    course : mongooseToObject(course)
                });
            })
            .catch(next)
            
    }
    // [GET] /course/get
    create(req, res, next){
        res.render('courses/create');
    }

    // [POST] /course/store
    async store(req, res, next){
        const formData=req.body;
        formData.image=`https://img.youtube.com/vi/${formData.videoId}/hqdefault.jpg`
        const baseSlug = slugify(formData.name || '', {
            lower: true,
            strict: true,
            locale: 'vi'
        });
        let slug=baseSlug;
        let number=1;
        while(await Course.exists({slug:slug})){
            slug=`${baseSlug}-${number}`;
            ++number;
        }
        formData.slug=slug;
        const course=new Course(formData);
        course.save()
            .then(savedCourse => {
                console.log('Đã lưu khóa học:', savedCourse._id);
                res.send('Đã lưu vào CSDL');
            })
            .catch(next);
    }

}

module.exports = new CourseController();
