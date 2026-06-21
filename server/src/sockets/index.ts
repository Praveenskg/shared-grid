import type { Server } from "socket.io";

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("disconnect", () => {
      console.log(`${socket.id} disconnected`);
    });
  });
}