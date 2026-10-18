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
        const formData={...req.body};
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
                res.redirect('/me/stored/courses');
            })
            .catch(next);
    }
    // [GET] /course/:id/edit
    edit(req, res, next){
        Course.findById(req.params.id)
            .then(course=> res.render('courses/edit', {
                course : mongooseToObject(course)
            }))
            .catch(err=>next(err));
    }
    // [PUT] /courses/:id
    update(req, res, next){
        Course.updateOne({_id: req.params.id}, req.body)
            .then(()=>res.redirect('/me/stored/courses'))
            .catch(next);
    }
    // [DELETE] /courses/:id/
    destroy(req, res, next){
        Course.updateOne(
            {_id: req.params.id,
            deletedAt: null,
            }, 
            {
                $set: {deletedAt: new Date()},
            }
        )
            .then(()=> res.redirect('/me/stored/courses'))
            .catch(next);
    }
    // [DELETE] /courses/:id/forceDelete
    forceDestroy(req, res, next){
        Course.deleteOne(
            {   _id: req.params.id,
                deletedAt: { $ne: null },
            }
        )
            .then(()=> res.redirect('/me/stored/courses'))
            .catch(next);
    }
    // [PATCH] /:id/restore
    restore(req, res, next) {
    Course.updateOne(
        {
            _id: req.params.id,
            deletedAt: { $ne: null },
        },
        {
            $set: { deletedAt: null },
        }
    )
        .then(() => res.redirect('/me/trash/courses'))
        .catch(next);
    }
    // [POST] /courses/handle-form-actions
    handleFormActions(req,res,next) {
        switch (req.body.action) {
            case 'delete':
                Course.updateMany(
                    {_id: {$in: req.body.courseIds},
                    deletedAt: null,
                    }, 
                    {
                        $set: {deletedAt: new Date()},
                    }
                )
                    .then(()=> res.redirect('/me/stored/courses'))
                    .catch(next);
                break;
        
            default:
                res.json({message: 'Action is invalid'});
        }
    }
}

module.exports = new CourseController();
