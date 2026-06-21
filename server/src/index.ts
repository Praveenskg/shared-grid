import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import { connectDB } from "./db/connect-db.js";
import { seedTiles } from "./services/seed-tiles";

dotenv.config();

async function bootstrap() {
  await connectDB();

  await seedTiles();

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
    res.json({
      success: true,
      message: "Server is running",
    });
  });

  const PORT = Number(process.env.PORT) || 5000;

  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap().catch(console.error);
