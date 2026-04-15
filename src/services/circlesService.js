import {
  getPopularCirclesFromDb,
  getAllCirclesFromDb,
  getCirclesOwnedByUserFromDb,
  getMembershipFromDb,
  getCircleByIdFromDb,
  getMembershipsInCircleFromDb,
  createCircleInDb,
  insertOwnerAsMemberInDb,
  getCirclesUserIsMemberOfFromDb,
  deleteCircleFromDb,
  updateCircleInDb,
  addMemberInDb,
} from "../models/circlesModel.js";
import { ROLES } from "../constants.js";
import { getUserByUsernameFromDb } from "../models/usersModel.js";

export const getPopularCircles = async (limit = 6) => {
  return await getPopularCirclesFromDb(limit);
};

export const getAllCircles = async () => {
  return await getAllCirclesFromDb();
};

export const getCirclesOwnedByUser = async (userId) => {
  return await getCirclesOwnedByUserFromDb({ userId });
};

export const getCircleById = async (id) => {
  return getCircleByIdFromDb({ id });
};

export const getMembership = async (userId, circleId) => {
  return getMembershipFromDb({ userId, circleId });
};

export const getMembershipsInCircle = async (userId, circleId) => {
  return getMembershipsInCircleFromDb({ userId, circleId });
};

export const createCircle = async ({ name, description, ownerId }) => {
  const circle = await createCircleInDb({ name, description, ownerId });

  await insertOwnerAsMemberInDb({
    ownerId,
    circleId: circle.id,
  });

  return circle;
};

export const getCirclesUserIsMemberOf = async (userId) => {
  return await getCirclesUserIsMemberOfFromDb({ userId });
};

export const deleteCircleService = async (circleId) => {
  return await deleteCircleFromDb({ circleId });
};

export const updateCircle = async ({ name, description, circleId }) => {
  return await updateCircleInDb({ name, description, circleId });
};

export const addMemberByUsername = async ({
  circleId,
  actorUserId,
  actorRole,
  username,
}) => {
  if (![ROLES.OWNER, ROLES.ADMIN].includes(actorRole)) {
    throw new Error("Not allowed to add new members");
  }

  const user = await getUserByUsernameFromDb({ username });

  if (!user) {
    throw new Error("User does not exist!");
  }

  const exisitingMembership = await getMembershipFromDb({
    userId: user.id,
    circleId,
  });

  if (exisitingMembership) {
    throw new Error("User is already a member of this circle");
  }

  if (user.id === actorUserId && actorRole === ROLES.OWNER) {
    throw new Error("Owner is already a member");
  }

  return await addMemberInDb({ circleId, userId: user.id, role: ROLES.MEMBER });
};
