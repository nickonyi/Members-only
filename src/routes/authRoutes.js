import { Router } from "express";
import { getSignup, postSignup } from "../controllers/authController.js";
import { ensureGuest } from "../middlewares/authMiddleware.js";
import { signUpValidator } from "../middlewares/validators/authValidator.js";

const authRoutes = Router();

authRoutes.get("/signup", getSignup);
authRoutes.post("/signup", signUpValidator, postSignup);

export default authRoutes;
