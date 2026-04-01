import { getPopularCirclesFromDb } from "../models/circlesModel.js";

export const getPopularCircles = async (limit = 6) => {
  return await getPopularCirclesFromDb(limit);
};

export const getAllCircles = async () => {};

export const getCirclesOwnedByUser = async () => {};
