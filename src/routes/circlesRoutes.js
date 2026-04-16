import { Router } from "express";
import {
  addMemberPost,
  changeRoleToAdminGet,
  changeRoleToMemberGet,
  createCircleGet,
  createCirclePost,
  deleteCircleController,
  getCircles,
  removeMemberGet,
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

circlesRoutes.get(
  "/:circleId/members/:memberId/role/admin",
  ensureAuth,
  loadCircle,
  loadMembership,
  requirePermission(canManageMembers),
  changeRoleToAdminGet,
);

circlesRoutes.get(
  "/:circleId/members/:memberId/role/member",
  ensureAuth,
  loadCircle,
  loadMembership,
  requirePermission(canManageMembers),
  changeRoleToMemberGet,
);

circlesRoutes.get(
  "/:circleId/members/:memberId/remove",
  ensureAuth,
  loadCircle,
  loadMembership,
  requirePermission(canManageMembers),
  removeMemberGet,
);
export default circlesRoutes;
