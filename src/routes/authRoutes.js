import { Router } from "express";
import { getSignup } from "../controllers/authController.js";
import { ensureGuest } from "../middlewares/authMiddleware.js";

const authRoutes = Router();

authRoutes.get("/signup", ensureGuest, getSignup);

export default authRoutes;
