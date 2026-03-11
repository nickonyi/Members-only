import { Router } from "express";
import { showHomePage } from "../controllers/indexController";

const indexRoutes = Router();

indexRoutes.get("/", showHomePage);

export default indexRoutes;
