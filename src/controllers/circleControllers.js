import {
  getAllCircles,
  getCirclesOwnedByUser,
} from "../services/circlesService.js";

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

export const showCircle = (req, res) => {};
