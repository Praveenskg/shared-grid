export interface LeaderboardUser {
  _id: string;
  ownerName: string;
  color: string;
  tileCount: number;
}

export interface UserStats {
  ownerId: string;
  ownerName: string;
  color: string;
  tileCount: number;
  rank: number;
}