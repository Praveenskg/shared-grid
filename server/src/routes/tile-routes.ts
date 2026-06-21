import { Router } from "express";

import { Tile } from "../models/tile";

const router = Router();

router.get("/", async (_, res) => {
  const tiles = await Tile.find().sort({ tileId: 1 });

  res.json({
    success: true,
    data: tiles,
  });
});

router.patch("/:tileId/claim", async (req, res) => {
  const { tileId } = req.params;

  const {
    ownerId,
    ownerName,
    color,
  } = req.body;

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
      returnDocument: 'after'
    },
  );

  res.json({
    success: true,
    data: tile,
  });
});

export default router;