import Asset from "../models/asset.model.js";
import { errorHandler } from "../utils/error.js";

//to craete asset
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



  //wishlist

//   const express = require('express');
// const router = express.Router();
// const Wishlist = require('../models/Wishlist');
// const Product = require('../models/Product');
// const User = require('../models/User');

// // Add a product to the user's wishlist
// router.post('/like', async (req, res) => {
//     try {
//         const { userId, productId } = req.body;

//         // Check if the user exists
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Check if the product exists
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ error: 'Product not found' });
//         }

//         // Check if the product is already in the wishlist
//         const wishlist = await Wishlist.findOne({ userId });
//         if (wishlist && wishlist.products.includes(productId)) {
//             return res.status(400).json({ error: 'Product already in wishlist' });
//         }

//         // If wishlist doesn't exist, create a new one
//         if (!wishlist) {
//             const newWishlist = new Wishlist({
//                 userId,
//                 products: [productId]
//             });
//             await newWishlist.save();
//             return res.status(201).json(newWishlist);
//         }

//         // Add the product to the wishlist
//         wishlist.products.push(productId);
//         await wishlist.save();
//         res.status(200).json(wishlist);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server Error' });
//     }
// });

// module.exports = router;
  

  