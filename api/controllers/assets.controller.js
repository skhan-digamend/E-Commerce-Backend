import Asset from "../models/assets.model.js";
import { errorHandler } from "../utils/error.js"

export const createCategory = async(req,res,next)=>{
    const title=req.body;
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not allowed to create a asset'))
    }
    if(!title){
        return next(errorHandler(400, 'Please provide all the required fields '))
    }
    const newCategory = new Asset({
        ...req.body,
    });
    try{
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch(error){
        next(error);

    }
}