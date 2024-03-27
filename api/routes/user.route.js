import express from "express";
import { test } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { deleteUser } from "../controllers/user.controller.js";
import { logout } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
//delete account functionality route
router.delete("/delete/:userId", verifyToken,deleteUser);
//logout functionality route
router.post('/logout',logout);

export default router;
