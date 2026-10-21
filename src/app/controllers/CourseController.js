const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:id
    show(req, res, next) {
        Course.findOne({
            _id: req.params.id,
            deletedAt: null,
        })
            .then((course) => {
                if (!course) {
                    return res.status(404).send('Không tìm thấy khóa học');
                }

                return res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    async store(req, res, next) {
        try {
            const formData = { ...req.body };
            formData.image =
                `https://img.youtube.com/vi/${formData.videoId}/hqdefault.jpg`;

            const course = new Course(formData);
            await course.save();

            console.log('Đã lưu khóa học:', course._id);
            res.redirect('/me/stored/courses');
        } catch (error) {
            next(error);
        }
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findOne({
            _id: req.params.id,
            deletedAt: null,
        })
            .then((course) => {
                if (!course) {
                    return res.status(404).send('Không tìm thấy khóa học');
                }

                return res.render('courses/edit', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        const formData = { ...req.body };

        if (formData.videoId) {
            formData.image =
                `https://img.youtube.com/vi/${formData.videoId}/hqdefault.jpg`;
        }

        Course.updateOne(
            {
                _id: req.params.id,
                deletedAt: null,
            },
            formData,
        )
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.updateOne(
            {
                _id: req.params.id,
                deletedAt: null,
            },
            {
                $set: { deletedAt: new Date() },
            },
        )
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({
            _id: req.params.id,
            deletedAt: { $ne: null },
        })
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.updateOne(
            {
                _id: req.params.id,
                deletedAt: { $ne: null },
            },
            {
                $set: { deletedAt: null },
            },
        )
            .then(() => res.redirect('/me/trash/courses'))
            .catch(next);
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete': {
                const submittedIds = Array.isArray(req.body.courseIds)
                    ? req.body.courseIds
                    : [req.body.courseIds];
                const courseIds = submittedIds.filter(Boolean);

                Course.updateMany(
                    {
                        _id: { $in: courseIds },
                        deletedAt: null,
                    },
                    {
                        $set: { deletedAt: new Date() },
                    },
                )
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch(next);
                break;
            }

            default:
                res.status(400).json({ message: 'Action is invalid' });
        }
    }
}

module.exports = new CourseController();
