import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req,res)=>{
    res.json({message: ' API is working!'});
}

export const deleteUser = async (req,res, next)=>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, 'You are not allowed to delete this user'));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error);
    }
}