import { Router } from "express";
import { getCircles } from "../controllers/circleControllers.js";

const circlesRoutes = Router();

circlesRoutes.get("/", getCircles);

export default circlesRoutes;
