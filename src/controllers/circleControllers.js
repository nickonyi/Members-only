import {
  getAllCircles,
  getCirclesOwnedByUser,
  getMembershipsInCirlce,
} from "../services/circlesService.js";
import { getPostsByCircle } from "../services/postsService.js";

export const getCircles = async (req, res) => {
  const userId = req?.user?.id ?? null;

  const [allCircles, ownedCircles] = await Promise.all([
    getAllCircles(),
    getCirclesOwnedByUser(userId),
  ]);

  res.render("circles", {
    title: "All circles",
    circles: allCircles,
    ownedCircles,
  });
};

export const showCircle = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const role = req.membership?.role ?? null;

  const { posts: circlePosts, pagination } = getPostsByCircle({
    circleId: req.circle.id,
    viewerId: req.user?.id ?? null,
    page,
    limit: 6,
  });

  const isMember = Boolean(role);

  if (isMember) {
    const members = await getMembershipsInCirlce(req.circle.id);

    return res.render("circles/details", {
      title: req.circle.name,
      circle: req.circle,
      circlePosts,
      pagination,
      members,
    });
  }

  res.render("circles/details", {
    title: req.circle.name,
    circle: req.circle,
    circlePosts,
    pagination,
  });
};
