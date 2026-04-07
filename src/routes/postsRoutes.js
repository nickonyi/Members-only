import { Router } from "express";
import { getPosts, showPost } from "../controllers/postsController.js";
import { loadPost } from "../middlewares/loadersMiddleware.js";

const postsRoutes = Router();

postsRoutes.get("/", getPosts);

postsRoutes.get("/:postId", loadPost, showPost);

export default postsRoutes;
