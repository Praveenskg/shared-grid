import { Router } from "express";

import { Tile } from "../models/tile.js";
import { Activity } from "../models/activity.js";
import { getIO } from "../sockets/socket-instance.js";

const router = Router();

router.post("/reset", async (_, res) => {
  await Tile.updateMany(
    {},
    {
      ownerId: null,
      ownerName: null,
      color: null,
      claimedAt: null,
    },
  );

  await Activity.deleteMany({});

  getIO().emit("game-reset");

  res.json({
    success: true,
    message: "Game reset successfully",
  });
});

export default router;
