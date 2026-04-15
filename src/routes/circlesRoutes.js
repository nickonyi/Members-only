import { Router } from "express";
import {
  createCircleGet,
  createCirclePost,
  deleteCircleController,
  getCircles,
  showCircle,
  updateCircleGet,
} from "../controllers/circleControllers.js";
import {
  loadCircle,
  loadMembership,
} from "../middlewares/loadersMiddleware.js";
import { ensureAuth } from "../middlewares/authMiddleware.js";
import { circleValidator } from "../middlewares/validators/circleValidators.js";
import { requirePermission } from "../middlewares/permissionsMiddleware.js";
import {
  canDeleteCircle,
  canManageMembers,
} from "../policies/circlesPolicies.js";

const circlesRoutes = Router();

circlesRoutes.get("/", getCircles);

circlesRoutes
  .route("/create")
  .get(ensureAuth, createCircleGet)
  .post(ensureAuth, circleValidator, createCirclePost);

circlesRoutes.get("/:circleId", loadCircle, loadMembership, showCircle);

circlesRoutes
  .route("/:circleId/update")
  .get(
    ensureAuth,
    loadCircle,
    loadMembership,
    requirePermission(canManageMembers),
    updateCircleGet,
  );

circlesRoutes.get(
  "/:circleId/delete",
  ensureAuth,
  loadCircle,
  loadMembership,
  requirePermission(canDeleteCircle),
  deleteCircleController,
);

export default circlesRoutes;
