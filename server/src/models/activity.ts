import { Schema, model } from "mongoose";

export interface IActivity {
  tileId: number;
  ownerId: string;
  ownerName: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema(
  {
    tileId: {
      type: Number,
      required: true,
    },

    ownerId: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Activity = model("Activity", activitySchema);
