import { Router } from "express";
import {
  getPosts,
  showPost,
  createPostGet,
  createPostPost,
} from "../controllers/postsController.js";
import { loadMembership, loadPost } from "../middlewares/loadersMiddleware.js";
import { ensureAuth } from "../middlewares/authMiddleware.js";
import { postsValidator } from "../middlewares/validators/postValidators.js";

const postsRoutes = Router();

postsRoutes.get("/", getPosts);

postsRoutes
  .route("/create")
  .get(ensureAuth, createPostGet)
  .post(ensureAuth, postsValidator, createPostPost);

postsRoutes.get("/:postId", loadPost, loadMembership, showPost);

export default postsRoutes;
