import { api } from "@/lib/api";

interface ClaimTilePayload {
  tileId: number;
  ownerId: string;
  ownerName: string;
  color: string;
}

export async function claimTile({
  tileId,
  ownerId,
  ownerName,
  color,
}: ClaimTilePayload) {
  const response = await api.patch(
    `/tiles/${tileId}/claim`,
    {
      ownerId,
      ownerName,
      color,
    },
  );

  return response.data.data;
}