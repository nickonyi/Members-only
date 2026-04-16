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
  changeRoleInDB,
  removeMemberFromDb,
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

export const getMembershipsInCircle = async (circleId) => {
  return getMembershipsInCircleFromDb({ circleId });
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

export const changeRole = async ({
  circleId,
  actorUserId,
  actorRole,
  targetUserId,
  newRole,
}) => {
  const targetMembership = await getMembershipFromDb({
    userId: targetUserId,
    circleId,
  });

  if (!targetMembership) {
    throw new Error("User is not a member of this circle");
  }

  if (targetMembership.role === ROLES.OWNER) {
    throw new Error("Owner role cannot be changed");
  }

  if (actorRole === ROLES.ADMIN) {
    if (targetMembership.role !== ROLES.MEMBER) {
      throw new Error("Admin can only manage members");
    }

    if (newRole === ROLES.MEMBER) {
      throw new Error("Admin cannot demote admins");
    }
  }

  if (
    actorRole === ROLES.OWNER &&
    actorUserId === targetUserId &&
    newRole === ROLES.MEMBER
  ) {
    throw new Error("Owner cannot change their own role");
  }

  return await changeRoleInDB({
    circleId,
    userId: targetUserId,
    role: newRole,
  });
};

export async function removeMember({
  circleId,
  actorUserId,
  actorRole,
  targetUserId,
}) {
  const targetMembership = await getMembershipFromDb({
    userId: targetUserId,
    circleId,
  });

  if (!targetMembership) {
    throw new Error("User is not a member of this circle");
  }

  // 🚫 Owner cannot remove themselves
  if (actorRole === ROLES.OWNER && actorUserId === targetUserId) {
    throw new Error("Owner cannot remove themselves");
  }

  // 🚫 Admin restrictions
  if (actorRole === ROLES.ADMIN) {
    if (targetMembership.role === ROLES.OWNER) {
      throw new Error("Admin cannot remove owner");
    }
    if (targetMembership.role === ROLES.ADMIN) {
      throw new Error("Admin cannot remove another admin");
    }
  }

  return await removeMemberFromDb({
    circleId,
    userId: targetUserId,
  });
}
