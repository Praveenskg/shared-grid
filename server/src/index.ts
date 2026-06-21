import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

dotenv.config();

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;

  console.log(`Connected: ${socket.id}`);
  console.log(`Online: ${onlineUsers}`);

  io.emit("online-count", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;

    console.log(`Disconnected: ${socket.id}`);
    console.log(`Online: ${onlineUsers}`);

    io.emit("online-count", onlineUsers);
  });
});

const PORT = Number(process.env.PORT) || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});