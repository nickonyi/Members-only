import { getPopularCirclesFromDb } from "../models/circlesModel";

export const getPopularCircles = async (limit = 6) => {
  return await getPopularCirclesFromDb(limit);
};
