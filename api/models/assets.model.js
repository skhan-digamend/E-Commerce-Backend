import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getposts, updatepost } from '../controllers/assets.controller.js';

const router = express.Router();

router.post('/createassets', verifyToken, createassets)
router.get('/getassets', getassets)
router.delete('/deleteassets/:assetId/:userId', verifyToken, deleteassets)
router.put('/updateassets/:assetId/:userId', verifyToken, updateassets)


export default router;