import type { Server } from "socket.io";

let io: Server;

export function setIO(socketServer: Server) {
  io = socketServer;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }

  return io;
}