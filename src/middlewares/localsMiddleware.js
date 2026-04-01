import hbsHelpers from "../helpers/index.js";

export const setLocals = (req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.isAuthenticated = !!req.user;
  res.locals.helpers = hbsHelpers;
  res.locals.currentPath = req.originalUrl;

  next();
};
