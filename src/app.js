import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes.js";
import viewRoute from "./view-routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ejs 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views")); // views 폴더 지정
app.set("view engine", "ejs"); // 🔧 EJS 엔진 등록
//

app.use("/api", routes);

app.use("/view", viewRoute);

export default app;
