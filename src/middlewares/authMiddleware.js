export const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(`/auth/login?next=${encodeURIComponent(req.originalUrl)}`);
};

export const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};
