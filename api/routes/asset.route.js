import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createAsset } from "../controllers/asset.controller.js";
import { deleteAsset } from "../controllers/asset.controller.js";
import { getAssets } from "../controllers/asset.controller.js";
import { editAssets } from "../controllers/asset.controller.js";

const router = express.Router();

router.post("/createAsset", verifyToken, createAsset);
router.delete("/deleteasset/:assetId", verifyToken, deleteAsset);
router.get("/getAssets", getAssets);
router.put("/editAssets/:assetId", verifyToken, editAssets);

export default router;
