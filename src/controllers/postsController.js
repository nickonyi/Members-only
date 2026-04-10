import { getCirclesUserIsMemberOf } from "../services/circlesService.js";
import { getAllPosts, getPostsByAuthor } from "../services/postsService.js";
import AppError from "../utils/appError.js";

export const getPosts = async (req, res) => {
  const userId = req?.query?.id ?? null;

  const ownedPostPage = parseInt(req.query.ownedPostPage) || 1;
  const allPostPages = parseInt(req.query.allPostPages) || 1;

  const [
    { posts: allPosts, pagination: allPostsPagination },
    { posts: ownedPosts, pagination: ownedPostsPagination },
  ] = await Promise.all([
    getAllPosts({ viewerId: userId, page: allPostPages, limit: 9 }),
    getPostsByAuthor({ userId, page: ownedPostPage, limit: 6 }),
  ]);

  res.render("posts", {
    title: "All Posts",
    allPosts,
    ownedPosts,
    allPostsPagination,
    ownedPostsPagination,
  });
};

export const showPost = (req, res) => {
  console.log(req.post);

  res.render("posts/details", {
    title: req.post.title,
    post: req.post,
  });
};

export const createPostGet = async (req, res, next) => {
  const userId = req.user?.id;

  const userCircles = await getCirclesUserIsMemberOf(userId);

  if (!userCircles) {
    next(new AppError("Create or join a circle first", 403));
  }

  res.render("posts/create", {
    title: "create new Post",
    userCircles,
  });
};
