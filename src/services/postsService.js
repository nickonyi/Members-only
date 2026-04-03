import {
  getAllPostsFromDb,
  getLatestPublicPostsFromDb,
  countAllPostsFromDb,
  getPostsByAuthorFromDB,
} from "../models/postsModel.js";
import { getPagination } from "../utils/pagination.js";

export const getLatestPublicPosts = async (limit = 6) => {
  return await getLatestPublicPostsFromDb(limit);
};

export const getAllPosts = async ({
  viewerId = null,
  page = 1,
  limit = 10,
}) => {
  const { limit: l, offset } = getPagination({ page, limit });

  const posts = await getAllPostsFromDb({
    viewerId,
    limit: l,
    offset,
  });

  const total = await countAllPostsFromDb({ viewerId });
  const totalPages = Math.ceil(total / l);

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    },
  };
};
export const getPostsByAuthor = async ({ userId, page = 1, limit = 10 }) => {
  const { limit: l, offset } = getPagination({ page, limit });

  const posts = await getPostsByAuthorFromDB({
    userId,
    limit: l,
    offset,
  });

  const total = await countAllPostsFromDb({ userId });
  const totalPages = Math.ceil(total / l);

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      hasPrev: page > 1,
      hasNext: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
    },
  };
};
