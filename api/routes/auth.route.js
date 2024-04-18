import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { signin } from "../controllers/auth.controller.js";
// import { signinasguest } from "../controllers/auth.controller.js";
import { google } from "../controllers/auth.controller.js";
// import { signupasguest } from "../controllers/auth.controller.js";

const router = express.Router();

//all the functionalities for the routes will be present in respective controller file

//signup route
router.post("/signup", signup);
//signupasguest
// router.post("/signupasguest", signupasguest);
//signin route
router.post("/signin", signin);
//signinasguest route
// router.post("/signinasguest", signinasguest);
//google
router.post("/google", google);

export default router;
