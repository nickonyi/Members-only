import { Router } from "express";
import {
  getPosts,
  showPost,
  createPostGet,
  createPostPost,
} from "../controllers/postsController.js";
import { loadPost } from "../middlewares/loadersMiddleware.js";
import { ensureAuth } from "../middlewares/authMiddleware.js";
import { postsValidator } from "../middlewares/validators/postValidators.js";

const postsRoutes = Router();

postsRoutes.get("/", getPosts);

postsRoutes
  .route("/create")
  .get(ensureAuth, createPostGet)
  .post(ensureAuth, postsValidator, createPostPost);

postsRoutes.get("/:postId", loadPost, showPost);

export default postsRoutes;
