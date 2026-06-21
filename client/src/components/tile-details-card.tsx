import type { Tile } from "@/types/tile";

interface TileDetailsCardProps {
  tile: Tile | null;
}

export function TileDetailsCard({
  tile,
}: TileDetailsCardProps) {
  return (
    <div className="h-fit w-80 rounded-xl border bg-white p-4">
      {tile ? (
        <>
          <h2 className="text-lg font-semibold">
            Tile #{tile.tileId}
          </h2>

          <div className="mt-4 space-y-3">
            <div>
              <span className="font-medium">
                Owner:
              </span>{" "}
              {tile.ownerName ?? "Unclaimed"}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">
                Color:
              </span>

              {tile.color ? (
                <>
                  <div
                    className="h-4 w-4 rounded-full border"
                    style={{
                      backgroundColor: tile.color,
                    }}
                  />

                  <span>{tile.color}</span>
                </>
              ) : (
                "-"
              )}
            </div>

            <div>
              <span className="font-medium">
                Claimed:
              </span>{" "}
              {tile.claimedAt
                ? new Date(
                  tile.claimedAt,
                ).toLocaleString()
                : "-"}
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold">
            Tile Details
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Hover over a tile to view details.
          </p>
        </>
      )}
    </div>
  );
}