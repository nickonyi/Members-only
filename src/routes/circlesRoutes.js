import { Router } from "express";
import {
  addMemberPost,
  createCircleGet,
  createCirclePost,
  deleteCircleController,
  getCircles,
  showCircle,
  updateCircleGet,
  updateCirclePost,
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
  )
  .post(
    ensureAuth,
    loadCircle,
    loadMembership,
    requirePermission(canManageMembers),
    circleValidator,
    updateCirclePost,
  );

circlesRoutes.get(
  "/:circleId/delete",
  ensureAuth,
  loadCircle,
  loadMembership,
  requirePermission(canDeleteCircle),
  deleteCircleController,
);

circlesRoutes.post(
  "/:circleId/members/add",
  ensureAuth,
  loadCircle,
  loadMembership,
  requirePermission(canManageMembers),
  addMemberPost,
);

export default circlesRoutes;
