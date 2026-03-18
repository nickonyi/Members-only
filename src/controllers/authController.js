import { matchedData, validationResult } from "express-validator";

export const getSignup = (req, res) => {
  res.render("signup", { title: "Sign up", errors: [] });
};

export const postSignup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("hayo");

    return res.status(400).render("signup", {
      title: "sign up",
      errors: errors.array(),
      formData: req.body,
    });
  }
};
