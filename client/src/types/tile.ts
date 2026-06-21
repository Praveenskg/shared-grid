export interface Tile {
  _id: string;
  tileId: number;
  ownerId: string | null;
  ownerName: string | null;
  color: string | null;
  claimedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
