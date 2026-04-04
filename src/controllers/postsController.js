import { getAllPosts, getPostsByAuthor } from "../services/postsService.js";

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
