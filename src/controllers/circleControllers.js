import { ROLES } from "../constants.js";
import {
  addMemberByUsername,
  addUserToCircle,
  changeRole,
  createCircle,
  deleteCircleService,
  getAllCircles,
  getCircleById,
  getCirclesOwnedByUser,
  getMembershipsInCircle,
  removeMember,
  updateCircle,
} from "../services/circlesService.js";
import { getPostsByCircle } from "../services/postsService.js";
import { matchedData, validationResult } from "express-validator";

export const getCircles = async (req, res) => {
  const userId = req?.user?.id ?? null;

  const [allCircles, ownedCircles] = await Promise.all([
    getAllCircles(),
    getCirclesOwnedByUser(userId),
  ]);

  res.render("circles", {
    title: "All circles",
    circles: allCircles,
    ownedCircles,
  });
};

export const showCircle = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const role = req.membership?.role ?? null;

  const { posts: circlePosts, pagination } = await getPostsByCircle({
    circleId: req.circle.id,
    viewerId: req.user?.id ?? null,
    page,
    limit: 6,
  });

  const isMember = Boolean(role);

  if (isMember) {
    const members = await getMembershipsInCircle(req.circle.id);
    console.log(members);

    return res.render("circles/details", {
      title: req.circle.name,
      circle: req.circle,
      circlePosts,
      pagination,
      members,
    });
  }

  res.render("circles/details", {
    title: req.circle.name,
    circle: req.circle,
    circlePosts,
    pagination,
  });
};

export const createCircleGet = (req, res) => {
  res.render("circles/create", {
    title: "Create new circle",
    errors: [],
    formData: [],
  });
};

export const createCirclePost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("circles/create", {
      title: "Create New Circle",
      errors: errors.array(),
      formData: req.body,
    });
  }

  const { name, description, code } = matchedData(req);

  await createCircle({ name, description, ownerId: req.user.id, code });

  res.redirect("/circles");
};

export const deleteCircleController = async (req, res) => {
  await deleteCircleService(req.circle.id);

  res.redirect("/circles");
};

export const updateCircleGet = async (req, res) => {
  const members = await getMembershipsInCircle(req.circle.id);

  res.render("circles/update", {
    title: "update" + req.circle.name,
    circle: req.circle,
    members,
    errors: [],
  });
};

export const updateCirclePost = async (req, res) => {
  const errors = validationResult(req);
  const members = await getMembershipsInCircle(req.circle.id);

  if (!errors.isEmpty()) {
    return res.render("circles/update", {
      title: "Update" + req.circle.name,
      errors: errors.array(),
      circle: req.circle,
      members,
    });
  }

  const { name, description } = matchedData(req);

  await updateCircle({ name, description, circleId: req.circle.id });

  res.redirect("/circles/" + req.circle.id);
};

export const addMemberPost = async (req, res, next) => {
  try {
    const { circleId } = req.params;
    const { username } = req.body;
    await addMemberByUsername({
      circleId: Number(circleId),
      actorUserId: req.user.id,
      actorRole: req.membership.role,
      username,
    });

    res.redirect(`/circles/${circleId}`);
  } catch (err) {
    next(err);
  }
};

export const changeRoleToAdminGet = async (req, res, next) => {
  try {
    await changeRole({
      circleId: Number(req.params.circleId),
      actorUserId: req.user.id,
      actorRole: req.membership.role,
      targetUserId: Number(req.params.memberId),
      newRole: ROLES.ADMIN,
    });

    res.redirect(`/circles/${req.params.circleId}`);
  } catch (err) {
    next(err);
  }
};

export const changeRoleToMemberGet = async (req, res, next) => {
  try {
    await changeRole({
      circleId: Number(req.params.circleId),
      actorUserId: req.user.id,
      actorRole: req.membership.role,
      targetUserId: Number(req.params.memberId),
      newRole: ROLES.MEMBER,
    });

    res.redirect(`/circles/${req.params.circleId}`);
  } catch (err) {
    next(err);
  }
};

export const removeMemberGet = async (req, res, next) => {
  try {
    await removeMember({
      circleId: Number(req.params.circleId),
      actorUserId: req.user.id,
      actorRole: req.membership.role,
      targetUserId: Number(req.params.memberId),
      newRole: ROLES.MEMBER,
    });

    res.redirect(`/circles/${req.params.circleId}`);
  } catch (err) {
    next(err);
  }
};

export const joinCircle = async (req, res, next) => {
  try {
    const { secretCode } = req.body;

    const circle = await getCircleById(req.params.id);

    if (secretCode !== circle.secretCode) {
      const err = new Error("The code is incorrect!");
      err.status = 400;
      return next(err);
    }

    await addUserToCircle(req.user.id, circle.id);
    res.redirect(`/circles/${circle.id}`);
  } catch (err) {
    next(err);
  }
};
