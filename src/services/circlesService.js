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
} from "../models/circlesModel.js";

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
