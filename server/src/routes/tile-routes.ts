import { Router } from "express";

import { Tile } from "../models/tile";
import { getIO } from "../sockets/socket-instance";

const router = Router();

router.get("/", async (_, res) => {
  const tiles = await Tile.find().sort({ tileId: 1 });

  res.json({
    success: true,
    data: tiles,
  });
});

router.patch("/:tileId/claim", async (req, res) => {
  try {
    const { tileId } = req.params;

    const { ownerId, ownerName, color } = req.body;

    const tile = await Tile.findOneAndUpdate(
      {
        tileId: Number(tileId),
      },
      {
        ownerId,
        ownerName,
        color,
        claimedAt: new Date(),
      },
      {
        returnDocument: "after",
      },
    );

    if (!tile) {
      return res.status(404).json({
        success: false,
        message: "Tile not found",
      });
    }

    getIO().emit("tile-updated", tile);

    res.json({
      success: true,
      data: tile,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
