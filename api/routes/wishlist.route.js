import express from "express";
import { getLikeProducts, getParticularLikeProducts,likeProductToWishList } from "../controllers/wishlist.controller.js";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAuthorization } from "../utils/verifyUser.js";

const router = express.Router();
 
router.post("/likePorduct",verifyTokenAuthorization, likeProductToWishList)
router.get("/getAllLikeProducts",verifyTokenAndAdmin, getLikeProducts)
router.get("/getParticularLikeProducts",verifyTokenAuthorization, getParticularLikeProducts);
export default router;
