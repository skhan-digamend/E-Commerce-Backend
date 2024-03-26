import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { signin } from '../controllers/auth.controller.js';

const router = express.Router();

//all the functionalities for the routes will be present in respective controller file


//signup route
router.post('/signup', signup);
//signin route
router.post('/signin', signin);

export default router
