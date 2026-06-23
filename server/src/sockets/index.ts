import type { Server } from "socket.io";

const connectedUsers = new Set<string>();

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket) => {
    connectedUsers.add(socket.id);

    io.emit("online-count", connectedUsers.size);

    console.log(`${socket.id} connected | Online: ${connectedUsers.size}`);

    socket.on("disconnect", (reason) => {
      connectedUsers.delete(socket.id);

      io.emit("online-count", connectedUsers.size);

      console.log(
        `${socket.id} disconnected (${reason}) | Online: ${connectedUsers.size}`,
      );
    });
  });
}