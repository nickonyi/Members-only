import {
  getPopularCirclesFromDb,
  getAllCirclesFromDb,
  getCirclesOwnedByUserFromDb,
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
