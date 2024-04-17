import express from "express";
import { verifyToken,verifyTokenAuthorization , verifyTokenAndAdmin} from "../utils/verifyUser.js";
import { createOrder } from "../controllers/orders.controller.js";
import { UpdateOrder } from "../controllers/orders.controller.js";
import { getOrdersOfUser } from "../controllers/orders.controller.js";
import { deleteOrder } from "../controllers/orders.controller.js";
import { OrdersOfAllUsers } from "../controllers/orders.controller.js";

const router = express.Router();

router.post("/createOrder",verifyTokenAuthorization, createOrder );
router.put("/:id/updateOrders",verifyTokenAuthorization, UpdateOrder); //id mentioned her is orderId
router.get("/getOrders/:userId",verifyTokenAuthorization,getOrdersOfUser);
router.delete("/deleteOrder/:id",verifyTokenAuthorization,deleteOrder);
router.get("/getAllUsersOrders",verifyTokenAndAdmin, OrdersOfAllUsers);
export default router;
