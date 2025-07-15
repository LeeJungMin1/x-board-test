import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes.js";
import viewRoute from "./view-routes.js";
import { handleError } from "./utils/common-utils/error-handler.js";

// 스케쥴러 자동 실행
import { runWeatherAISchedulers } from "./features/weather-ai/weather-ai-scheduler.js";
import { runReplaceAlarmScheduler } from "./features/replace-alarm/replace-alarm-scheduler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/pdf_file", express.static(path.join(process.cwd(), "pdf_file")));

// ejs 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views")); // views 폴더 지정
app.set("view engine", "ejs"); // 🔧 EJS 엔진 등록

app.use("/api", routes);

app.use("/view", viewRoute);

app.use((err, req, res, next) => {
  handleError(res, err);
});

runWeatherAISchedulers();
runReplaceAlarmScheduler();

export default app;
