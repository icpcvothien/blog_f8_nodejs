const express=require('express');
const router=express.Router();

const courseController=require('../app/controllers/CourseController');

router.get('/create', courseController.create )
router.post('/store',courseController.store); // them
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update); // sua
router.delete('/:id', courseController.destroy); // xoa
router.patch('/:id/restore', courseController.restore); // sửa 1 trường
router.get('/:slug',courseController.show);


module.exports=router;