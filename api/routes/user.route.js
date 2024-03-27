import express from "express";
import { test } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.delete("/delete/:userId", verifyToken,deleteUser);

export default router;
