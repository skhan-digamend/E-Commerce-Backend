import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createCategory } from '../controllers/assets.controller.js';
import { getCategory } from '../controllers/assets.controller.js';
import { deleteCategory } from '../controllers/assets.controller.js';

const router= express.Router();

router.post('/createCategory',verifyToken, createCategory);
router.get('/getCategory',getCategory);
router.delete('/deleteCategory/:categoryId',verifyToken,deleteCategory);


export default router;