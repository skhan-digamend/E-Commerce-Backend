import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createCategory } from '../controllers/category.controller.js';
import { getCategory } from '../controllers/category.controller.js';
import { deleteCategory } from '../controllers/category.controller.js';
import { editCategory } from '../controllers/category.controller.js';

const router= express.Router();

router.post('/createCategory',verifyToken, createCategory);
router.get('/getCategory',getCategory);
router.delete('/deleteCategory/:categoryId',verifyToken,deleteCategory);
router.put('/editCategory/:categoryId',verifyToken,editCategory);

export default router;