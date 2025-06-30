import { Router } from "express";
import chartViewRoutes from "./view-routes/chart-view-routes.js";
import chart2ViewRoutes from "./view-routes/chart2-view-routes.js";

const router = Router();

router.use("/chart", chartViewRoutes);
router.use("/chart2", chart2ViewRoutes);

export default router;
