import { getLatestPublicPostsFromDb } from "../models/postsModel.js";

export const getLatestPublicPosts = async (limit = 6) => {
  return await getLatestPublicPostsFromDb(limit);
};
