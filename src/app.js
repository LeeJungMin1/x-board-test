import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

export default app;
