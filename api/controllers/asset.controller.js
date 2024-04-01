import Asset from "../models/asset.model.js";
import { errorHandler } from "../utils/error.js";

export const createAsset = async (req, res, next) => {
    const {assetName,Id,fileSize,fileFormat,price} = req.body;
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to create a category"));
    }
    if (!assetName || !Id || !fileSize|| !fileFormat ||!price|| assetName==" "||Id==" "||fileSize==" "|| fileFormat==" "|| price==" " ) {
      return next(errorHandler(400, "Please provide all the required fields "));
    }
    const slug = req.body.assetName
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
    const newAsset = new Asset({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    try {
      const savedAsset = await newAsset.save();
      res.status(201).json(savedAsset);
    } catch (error) {
      next(error);
    }
  };

  // Delete Asset

  export const deleteAsset = async (req, res, next) => {
    if (!req.user.isAdmin || req.user._id !== req.params.userId) {
      return next(
        errorHandler(403, "You are not allowed to delete this category")
      );
    }
    try {
      await Asset.findByIdAndDelete(req.params.assetId);
      res.status(200).json("The post has been deleted");
    } catch (error) {
      next(error);
    }
  };


  //get all assets

  export const getAssets = async (req, res, next) => {
    try {
      const allAssets = await Asset.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.assetName && { title: req.query.assetName }),
        ...(req.query.Id && { _id: req.query.Id }),
        ...(req.query.fileSize && { _id: req.query.fileSize}),
        ...(req.query.fileFormat && { _id: req.query.fileFormat}),
        ...(req.query.price && { _id: req.query.price }),
        // ...(req.query.assetId && { _id: req.query.assetId }),
      });
      res.status(200).json({
        allAssets,
      });
    } catch (error) {
      next(error);
    }
  };
  

  //edit assets

  export const editAssets = async (req, res, next) => {
    if (!req.user.isAdmin || req.user._id != req.params.userId) {
      return next(errorHandler(403, "You are not allowed to edit this post"));
    }
    try {
      const updatedAssets = await Asset.findByIdAndUpdate(
        req.params.assetId,
        {
          $set: {
            assetName: req.body.assetName,
            Id: req.body.Id,
            fileSize:req.body.fileSize,
            fileFormat:req.body.fileFormat,
            price:req.body.fileFormat
          },
        },
        { new: true }
      );
      res.status(200).json(updatedAssets);
    } catch (error) {
      next(error);
    }
  };
  

  