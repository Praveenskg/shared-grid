import { Schema, model } from "mongoose";

export interface ITile {
  tileId: number;
  ownerId: string | null;
  ownerName: string | null;
  color: string | null;
  claimedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const tileSchema = new Schema<ITile>(
  {
    tileId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    ownerId: {
      type: String,
      default: null,
      index: true,
      trim: true,
    },

    ownerName: {
      type: String,
      default: null,
      trim: true,
    },

    color: {
      type: String,
      default: null,
    },

    claimedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Tile = model<ITile>("Tile", tileSchema);