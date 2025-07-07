import http from "http";
import app from "./app.js";
import { API_SERVER_PORT } from "../src/config/config.js";
import { initSocket } from "./websocket/index.js";

const PORT = API_SERVER_PORT || 3000;

const startServer = async () => {
  const server = http.createServer(app);

  initSocket(server);

  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(
      `📡 WebSocket running at ws://localhost:${PORT}/xboard-alert-socket/`
    );
  });
};

startServer();
