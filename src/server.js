import app from "./app.js";
import { API_SERVER_PORT } from "../src/config/config.js";
// import { connectListener } from "./config/db.js";

const PORT = API_SERVER_PORT || 3000;

const startServer = async () => {
  // await connectListener();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();
