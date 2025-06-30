import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  const { device_id, sensor_type, limit } = req.query;
  res.render("chart", { device_id, sensor_type, limit }); // chart.ejs에 변수 전달
});

export default router;
