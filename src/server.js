import app from "./app.js";
// import { connectListener } from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // await connectListener();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
};

startServer();
