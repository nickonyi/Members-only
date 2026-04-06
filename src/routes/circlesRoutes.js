import { Router } from "express";
import { getCircles, showCircle } from "../controllers/circleControllers.js";
import {
  loadCircle,
  loadMembership,
} from "../middlewares/loadersMiddleware.js";

const circlesRoutes = Router();

circlesRoutes.get("/", getCircles);

circlesRoutes.get("/:circleId", loadCircle, loadMembership, showCircle);

export default circlesRoutes;
