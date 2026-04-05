import { getCircleById, getMembership } from "../services/circlesService.js";
import AppError from "../utils/appError";

export const loadCirlce = async (req, res, next) => {
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
export const loadMembership = async (req, res, next) => {
  if (!req.user || !req.circle) {
    req.membership = null;
    res.locals.role = null;
    return next();
  }

  const membership = await getMembership(req.user.id, req.circle.id);

  req.membership = membership || null;
  res.locals.role = membership?.role || null;

  next();
};
