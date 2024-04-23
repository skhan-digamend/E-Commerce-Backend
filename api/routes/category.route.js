import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createCategory, getAllCategory, getCategoryById } from "../controllers/category.controller.js";
import { deleteCategory } from "../controllers/category.controller.js";
import { editCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.post("/createCategory", createCategory);
router.get("/getAllCategory", getAllCategory);
router.get("/getCategory/:id",getCategoryById) 
router.delete("/deleteCategory/:categoryId", deleteCategory);
router.put("/editCategory/:categoryId", editCategory);

export default router;
