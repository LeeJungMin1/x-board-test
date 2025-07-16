import { Server } from "socket.io";
import logger from "../utils/common-utils/logger.js";
import { AppError } from "../utils/common-utils/error-handler.js";

let io;

/**
 * WebSocket 서버를 초기화합니다.
 * @param {http.Server} server - HTTP 서버 인스턴스
 * @returns {Server} - Socket.IO 서버 인스턴스
 */

export const initSocket = (server) => {
  io = new Server(server, {
    path: "/xboard-alert-socket/",
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    logger.info(`✅ WebSocket 연결: ${socket.id}`);

    socket.on("disconnect", () => {
      logger.info(`❎ WebSocket 연결 종료: ${socket.id}`);
    });
  });

  return io;
};

/**
 * 초기화된 Socket.IO 인스턴스를 반환합니다.
 * @returns {Server} - Socket.IO 서버 인스턴스
 * @throws {AppError} - 초기화되지 않은 경우 예외 발생
 */
export const getIO = () => {
  if (!io) {
    throw new AppError(
      "Socket.io 인스턴스가 초기화되지 않았습니다.",
      500,
      "SOCKET_NOT_INITIALIZED"
    );
  }
  return io;
};
