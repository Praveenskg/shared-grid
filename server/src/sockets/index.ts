import type { Server } from "socket.io";

let onlineUsers = 0;

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket) => {
    onlineUsers++;
    io.emit("online-count", onlineUsers);
    console.log(`${socket.id} connected`);
    socket.on("disconnect", () => {
      onlineUsers--;
      io.emit("online-count", onlineUsers);

      console.log(`${socket.id} disconnected`);
    });
  });
}