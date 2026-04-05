import { Router } from "express";
import { getCircles, showCircle } from "../controllers/circleControllers.js";
import {
  loadCirlce,
  loadMembership,
} from "../middlewares/loadersMiddleware.js";

const circlesRoutes = Router();

circlesRoutes.get("/", getCircles);

circlesRoutes.get("/:circleId", loadCirlce, loadMembership, showCircle);

export default circlesRoutes;
