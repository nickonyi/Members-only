import { Router } from "express";
import {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  getLogout,
} from "../controllers/authController.js";
import { ensureGuest } from "../middlewares/authMiddleware.js";
import {
  signUpValidator,
  loginValidator,
} from "../middlewares/validators/authValidator.js";

const authRoutes = Router();

authRoutes.get("/signup", ensureGuest, getSignup);
authRoutes.post("/signup", ensureGuest, signUpValidator, postSignup);

authRoutes.get("/login", ensureGuest, getLogin);
authRoutes.post("/login", loginValidator, postLogin);

authRoutes.post("/logout", getLogout);

export default authRoutes;
