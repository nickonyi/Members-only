import { Router } from "express";
import { getSignup, postSignup } from "../controllers/authController.js";
import { ensureGuest } from "../middlewares/authMiddleware.js";

const authRoutes = Router();

authRoutes.get("/signup", getSignup);
authRoutes.post("/signup", postSignup);

export default authRoutes;
