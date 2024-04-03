import express from "express";
import { AddProductToWishlist } from "../controllers/wishlist.controller.js";

const router = express.Router();

router.post("/addProductToWishlist", AddProductToWishlist);
// router.delete("/deleteasset/:assetId", verifyToken, deleteAsset);
// router.get("/getAssets", getAssets);
// router.put("/editAssets/:assetId", verifyToken, editAssets);

export default router;
