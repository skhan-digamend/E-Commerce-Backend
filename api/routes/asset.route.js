import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createAsset, getAllAssets, getAssetsById,  } from "../controllers/asset.controller.js";
import { deleteAsset } from "../controllers/asset.controller.js";
import { editAssets } from "../controllers/asset.controller.js";
import { uploadFiles } from "../utils/s3UploadClient.js";

const router = express.Router();

router.post("/createAsset",uploadFiles, createAsset);
router.get("/getAssets/:id",getAssetsById);
router.delete("/deleteasset/:assetId", verifyToken, deleteAsset);
router.get("/getAllAssets", getAllAssets);
router.put("/editAssets/:assetId", verifyToken, editAssets);

export default router;
