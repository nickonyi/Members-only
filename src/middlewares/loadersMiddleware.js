import { getCircleById } from "../services/circlesService.js";
import AppError from "../utils/appError";

const loadCirlce = async (req, res, next) => {
  const circleId = req.params?.circleId ?? req.post?.circleId;

  const circle = await getCircleById(circleId);

  if (!circle) {
    return next(
      new AppError(
        `If this were an API, you'd get { error: 'Not Found' }`,
        404,
        req.originalUrl,
      ),
    );
  }

  req.circle = circle;
  res.locals.circle = circle;

  next();
};
const loadMembership = (req, res, next) => {};
