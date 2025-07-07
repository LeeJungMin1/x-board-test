import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    path: "/xboard-alert-socket/",
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ WebSocket 연결:", socket.id);

    socket.on("disconnect", () => {
      console.log("❎ WebSocket 연결 종료", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io 인스턴스가 초기화되지 않았습니다.");
  }
  return io;
};
