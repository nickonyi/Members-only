import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import indexRoutes from "./routes/indexRoutes.js";
dotenv.config();

const PORT = process.env.PORT;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", indexRoutes);

app.listen(PORT, () => {
  console.log(`Listening at port:${PORT}`);
});
