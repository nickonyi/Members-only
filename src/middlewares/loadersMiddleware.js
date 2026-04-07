import { getCircleById, getMembership } from "../services/circlesService.js";
import { getPostById } from "../services/postsService.js";
import AppError from "../utils/appError.js";

export const loadCircle = async (req, res, next) => {
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

export const loadPost = async (req, res, next) => {
  const { postId } = req.params;
  const viewerId = req?.user?.id ?? null;

  const post = await getPostById({ postId, viewerId });

  if (!post) {
    return next(new AppError("Post not found", 404, req.originalUrl));
  }

  if (post.visibility === "members_only" && !post.viewerIsMember) {
    return next(
      new AppError(
        "This post is only visible to members only",
        403,
        req.originalUrl,
      ),
    );
  }

  req.post = post;
  res.locals.post = post;
  next();
};
