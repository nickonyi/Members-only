import { getLatestPublicPostsFromDb } from "../models/postsModel.js";
import { getPagination } from "../utils/pagination.js";

export const getLatestPublicPosts = async (limit = 6) => {
  return await getLatestPublicPostsFromDb(limit);
};

export const getAllPosts = () => {};
export const getPostsByAuthor = () => {};
