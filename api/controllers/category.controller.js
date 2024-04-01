import Asset from "../models/category.model.js";
import { errorHandler } from "../utils/error.js";

//functionality for create category
export const createCategory = async (req, res, next) => {
  const title = req.body;
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a asset"));
  }
  if (!title) {
    return next(errorHandler(400, "Please provide all the required fields "));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newCategory = new Asset({
    ...req.body,
    slug,
    userId: req.user._id,
  });
  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

//functionality for get category

export const getCategory = async (req, res, next) => {
  try {
    const allCategory = await Asset.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.title && { title: req.query.title }),
      ...(req.query.categoryId && { _id: req.query.categoryId }),
    });
    res.status(200).json({
      allCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  if (!req.user.isAdmin || req.user._id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this category")
    );
  }
  try {
    await Asset.findByIdAndDelete(req.params.categoryId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    next(error);
  }
};


//edit category
export const editCategory = async (req, res, next) => {
  if (!req.user.isAdmin || req.user._id != req.params.userId) {
    return next(errorHandler(403, "You are not allowed to edit this post"));
  }
  try {
    const updatedCategory = await Asset.findByIdAndUpdate(
      req.params.categoryId,
      {
        $set: {
          title: req.body.title,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};
