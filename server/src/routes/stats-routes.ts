import { Router } from "express";

import { Tile } from "../models/tile.js";

const router = Router();

router.get("/leaderboard", async (_, res) => {
  const leaderboard = await Tile.aggregate([
    {
      $match: {
        ownerId: { $ne: null },
      },
    },
    {
      $group: {
        _id: "$ownerId",
        ownerName: {
          $first: "$ownerName",
        },
        color: {
          $first: "$color",
        },
        tileCount: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        tileCount: -1,
      },
    },
    {
      $limit: 10,
    },
  ]);

  res.json({
    success: true,
    data: leaderboard,
  });
});

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  const leaderboard = await Tile.aggregate([
    {
      $match: {
        ownerId: { $ne: null },
      },
    },
    {
      $group: {
        _id: "$ownerId",
        ownerName: {
          $first: "$ownerName",
        },
        color: {
          $first: "$color",
        },
        tileCount: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        tileCount: -1,
      },
    },
  ]);

  const rank = leaderboard.findIndex((user) => user._id === userId) + 1;

  const user = leaderboard.find((user) => user._id === userId);

  res.json({
    success: true,
    data: {
      ...user,
      rank,
    },
  });
});

export default router;
