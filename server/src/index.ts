import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { createServer } from "node:http";

import { Server } from "socket.io";

import { connectDB } from "./db/connect-db";
import tileRoutes from "./routes/tile-routes";
import { seedTiles } from "./services/seed-tiles";
import { registerSocketHandlers } from "./sockets/index";
import { setIO } from "./sockets/socket-instance";
import statsRoutes from "./routes/stats-routes";
import activityRoutes from "./routes/activity-routes";
import adminRoutes from "./routes/admin-routes";

dotenv.config();

async function bootstrap() {
  await connectDB();

  await seedTiles();

  const app = express();
  app.use(morgan("dev"));

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_, res) => {
    res.status(200).json({
      success: true,
      message: "Server is running",
    });
  });

  app.use("/api/tiles", tileRoutes);
  app.use("/api/stats", statsRoutes);
  app.use("/api/activities", activityRoutes);
  app.use("/api/admin", adminRoutes);

  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  setIO(io);

  registerSocketHandlers(io);

  const PORT = Number(process.env.PORT) || 5000;

  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
