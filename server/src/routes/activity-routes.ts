import { Router } from "express";

import { Activity } from "../models/activity";

const router = Router();

router.get("/", async (_, res) => {
  const activities = await Activity.find().sort({ createdAt: -1 }).limit(5);

  res.json({
    success: true,
    data: activities,
  });
});

export default router;
