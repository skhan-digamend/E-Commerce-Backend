import express from "express";
import { logout } from "../controllers/user.controller.js";

const router = express.Router();


//logout functionality route
router.post('/logout',logout);

export default router;