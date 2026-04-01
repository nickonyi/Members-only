import { Router } from "express";
import { getCircles } from "../controllers/circleControllers";

const circlesRoutes = Router();

circlesRoutes.get("/", getCircles);

export default circlesRoutes;
