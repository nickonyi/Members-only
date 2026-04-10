import { Router } from "express";
import {
  getPosts,
  showPost,
  createPostGet,
} from "../controllers/postsController.js";
import { loadPost } from "../middlewares/loadersMiddleware.js";
import { ensureAuth } from "../middlewares/authMiddleware.js";

const postsRoutes = Router();

postsRoutes.get("/", getPosts);

postsRoutes.get("/:postId", loadPost, showPost);

postsRoutes.route("/create").get(ensureAuth, createPostGet);

export default postsRoutes;
