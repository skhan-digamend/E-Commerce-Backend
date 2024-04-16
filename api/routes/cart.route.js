import express from "express";
import { verifyToken,verifyTokenAndAdmin,verifyTokenAuthorization } from "../utils/verifyUser.js";
import { UpdateCart, createCart, getUserCart,RemoveItemFromCart,GetAllUsersCart } from "../controllers/cart.controller.js";


const router = express.Router();

router.post("/createCart",verifyTokenAuthorization, createCart);
router.put("/updateCart/:id",verifyTokenAuthorization,UpdateCart);//cart ID should replace id in api
router.get("/getUserCart/:userId",verifyTokenAuthorization,getUserCart);
router.get("/getAllUsersCart",verifyTokenAndAdmin,GetAllUsersCart);
router.delete("/RemoveItemFromCart/:id",verifyTokenAuthorization,RemoveItemFromCart);

export default router;
