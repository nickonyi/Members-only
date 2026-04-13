import AppError from "../utils/appError.js";

export const requirePermission = (policyFn, resourcekey = null) => {
  return (req, res, next) => {
    const resource = resourcekey ? req[resourcekey] : null;
    const allowed = resource ? policyFn(req, resource) : policyFn(req);

    if (!allowed) {
      next(
        new AppError(
          "Forbidden: insufficient permissions",
          403,
          req.originalUrl,
        ),
      );
    }
  };
};
