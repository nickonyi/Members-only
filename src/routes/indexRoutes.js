import { Router } from "express";

const indexRoutes = Router();

indexRoutes.get("/", (req, res) => {
  res.send("Hello world!");
});

export default indexRoutes;
