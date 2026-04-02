import { Router } from "express";
import { getPosts } from "../controllers/postsController.js";

const postsRoutes = Router();

postsRoutes.get("/", getPosts);

export default postsRoutes;
