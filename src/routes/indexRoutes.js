import { Router } from "express";
import { showHomePage } from "../controllers/indexController.js";

const indexRoutes = Router();

indexRoutes.get("/", showHomePage);

export default indexRoutes;
