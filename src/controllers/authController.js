import { matchedData, validationResult } from "express-validator";
import { registerUser } from "../services/authService.js";

export const getSignup = (req, res) => {
  res.render("signup", { title: "Sign up", errors: {}, formData: {} });
};

export const postSignup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const mapperErrors = {};
    errors.array().forEach((err) => {
      if (!mapperErrors[err.path]) {
        mapperErrors[err.path] = err.msg;
      }
    });

    return res.status(400).render("signup", {
      title: "sign up",
      errors: mapperErrors,
      formData: req.body,
    });
  }

  const { firstName, lastName, email, password } = matchedData(req);

  const user = await registerUser({ firstName, lastName, email, password });

  req.session.regenerate((err) => {
    if (err) return next(err);

    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  });
};
