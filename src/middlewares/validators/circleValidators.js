import { body } from "express-validator";

export const circleValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required!")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters!"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description should not be less than 10 characters"),
];
