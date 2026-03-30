import { getPopularCircles } from "../services/circlesService";
import { getLatestPublicPosts } from "../services/postsService";

export const showHomePage = async (req, res, next) => {
  const publicPosts = await getLatestPublicPosts(6);
  const circles = await getPopularCircles(6);

  res.render("index", {
    title: "Welcome to CircleAccess",
    publicPosts,
    circles,
  });
};
