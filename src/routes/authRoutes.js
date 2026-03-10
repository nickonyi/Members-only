import { Router } from "express";

const authRoutes = Router();

authRoutes.get("/", (req, res) => {
  res.send("Hello world");
});

export default authRoutes;
