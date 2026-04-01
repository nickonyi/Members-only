import { getPopularCircles } from "../services/circlesService.js";
import { getLatestPublicPosts } from "../services/postsService.js";

export const showHomePage = async (req, res, next) => {
  const publicPosts = await getLatestPublicPosts(6);
  const circles = await getPopularCircles(6);

  console.log(publicPosts);

  res.render("index", {
    title: "Welcome to CircleAccess",
    publicPosts,
    circles,
  });
};
