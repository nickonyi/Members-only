import { getLatestPublicPostsFromDb } from "../models/postsModel";

export const getLatestPublicPosts = async (limit = 6) => {
  return await getLatestPublicPostsFromDb(limit);
};
