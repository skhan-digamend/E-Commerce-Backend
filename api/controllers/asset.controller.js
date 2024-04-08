import Asset from "../models/asset.model.js";
import Category from "../models/category.model.js";
import { errorHandler } from "../utils/error.js";

//to create asset
export const createAsset = async (req, res, next) => {
  const { assetName, Id, fileSize, fileFormat, price, category } = req.body;

  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a category"));
  }
  if (
    !assetName ||
    !Id ||
    !fileSize ||
    !fileFormat ||
    !price ||
    assetName == " " ||
    Id == " " ||
    fileSize == " " ||
    fileFormat == " " ||
    price == " "
  ) {
    return next(errorHandler(400, "Please provide all the required fields "));
  }
  const slug = req.body.assetName
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const existcategory = await Category.findById(req.body.category);
  if (!existcategory) {
    return next(errorHandler(400, "invalid category"));
  }

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
    let filter = {};
    if (req.query.category) {
      filter = { category: req.query.category.split(",") };
    }
    const allAssets = await Asset.find(filter).populate("category");
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
          fileSize: req.body.fileSize,
          fileFormat: req.body.fileFormat,
          price: req.body.price,
          category: req.body.category,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedAssets);
  } catch (error) {
    next(error);
  }
};

export const getAssetsById = async (req, res, next) => {
  const assets = await Asset.findById(req.params.id).populate("category");
  if (!assets) {
    res.status(500).json({ success: false });
  }
  res.send(assets);
};
