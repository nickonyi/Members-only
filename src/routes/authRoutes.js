import { Router } from "express";
import {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
} from "../controllers/authController.js";
import { ensureGuest } from "../middlewares/authMiddleware.js";
import { signUpValidator } from "../middlewares/validators/authValidator.js";

const authRoutes = Router();

authRoutes.get("/signup", ensureGuest, getSignup);
authRoutes.post("/signup", ensureGuest, signUpValidator, postSignup);

authRoutes.get("/login", getLogin);
authRoutes.post("/login", postLogin);

export default authRoutes;
