const express=require('express');
const router=express.Router();

const courseController=require('../app/controllers/CourseController');

router.get('/create', courseController.create )
router.post('/store',courseController.store); // them
router.post('/handle-form-actions',courseController.handleFormActions); 
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update); // sua
router.delete('/:id', courseController.destroy); // xoa
router.delete('/:id/force', courseController.forceDestroy); // xoa
router.patch('/:id/restore', courseController.restore); // sửa 1 trường
router.get('/:id',courseController.show);


module.exports=router;