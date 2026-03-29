import { body } from "express-validator";

export const signUpValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("First name must be between 2 and 30 characters")
    .matches(/^[A-Za-z\s-]+$/)
    .withMessage("First name can only contain letters, spaces and hiphens"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("Last name must be between 2 and 30 characters")
    .matches(/^[A-Za-z\s-]+$/)
    .withMessage("Last name can only contain letters, spaces and hiphens"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email must be valid")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain atleast an uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain atleast an lowercase letter"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

export const loginValidator = [
  body("email").trim().notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
