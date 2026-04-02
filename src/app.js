import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { globalErrorHandler } from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import indexRoutes from "./routes/indexRoutes.js";
import circlesRoutes from "./routes/circlesRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";
import AppError from "./utils/appError.js";
import { setLocals } from "./middlewares/localsMiddleware.js";
import { sessionMiddleware } from "./middlewares/sessionMiddleware.js";
import passport from "./config/passportConfig.js";
dotenv.config();

const PORT = process.env.PORT;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(sessionMiddleware);

app.use(passport.session());
app.use(setLocals);

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/circles", circlesRoutes);
app.use("./posts", postsRoutes);

app.use((req, res, next) => {
  next(new AppError("Page not found", 404, req.originalUrl));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Listening at port:${PORT}`);
});
