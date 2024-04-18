import express from "express";
import { verifyToken,verifyTokenAuthorization , verifyTokenAndAdmin} from "../utils/verifyUser.js";
import { checkout } from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/checkout",verifyTokenAuthorization, checkout);
export default router;
