export interface Tile {
  tileId: number;
  ownerId: string | null;
  ownerName: string | null;
  color: string | null;
  claimedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}