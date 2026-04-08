import { Router } from "express";
import {
  createCircleGet,
  createCirclePost,
  getCircles,
  showCircle,
} from "../controllers/circleControllers.js";
import {
  loadCircle,
  loadMembership,
} from "../middlewares/loadersMiddleware.js";
import { ensureAuth } from "../middlewares/authMiddleware.js";
import { circleValidator } from "../middlewares/validators/circleValidators.js";

const circlesRoutes = Router();

circlesRoutes.get("/", getCircles);

circlesRoutes
  .route("/create")
  .get(ensureAuth, createCircleGet)
  .post(ensureAuth, circleValidator, createCirclePost);

circlesRoutes.get("/:circleId", loadCircle, loadMembership, showCircle);

export default circlesRoutes;
