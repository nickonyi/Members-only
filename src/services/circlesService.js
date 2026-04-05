import {
  getPopularCirclesFromDb,
  getAllCirclesFromDb,
  getCirclesOwnedByUserFromDb,
  getMembershipFromDb,
  getCircleByIdFromDb,
  getMembershipsInCircleFromDb,
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

export const getMembership = async ({ userId, circleId }) => {
  return getMembershipFromDb({ userId, circleId });
};

export const getMembershipsInCirlce = async (circleId) => {
  return getMembershipsInCircleFromDb({ circleId });
};
