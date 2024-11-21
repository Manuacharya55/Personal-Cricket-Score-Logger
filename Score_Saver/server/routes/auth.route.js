import { Router } from "express";
import {
   registerUser,
   loginUser,
   getUserProfile
  } from "../controllers/auth.controller.js";
import {protectUserRoute} from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/profile").get(protectUserRoute,getUserProfile)

export default router;