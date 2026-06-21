import { GridCanvas } from "@/components/grid-canvas";
import { useTiles } from "@/hooks/use-tiles";
import { claimTile } from "@/lib/claim-tile";
import { useEffect } from "react";

import { socket } from "@/lib/socket";
import { queryClient } from "@/lib/query-client";
import type { Tile } from "./types/tile";

function App() {
  const { data, isLoading } = useTiles();

  useEffect(() => {
    const handleTileUpdated = (updatedTile: Tile) => {
      queryClient.setQueryData(["tiles"], (oldTiles: Tile[] | undefined) => {
        if (!oldTiles) return [];

        return oldTiles.map((tile) =>
          tile.tileId === updatedTile.tileId ? updatedTile : tile,
        );
      });
    };

    socket.on("tile-updated", handleTileUpdated);

    return () => {
      socket.off("tile-updated", handleTileUpdated);
    };
  }, []);

  const handleTileClick = async (tileId: number) => {
    await claimTile({
      tileId,
      ownerId: crypto.randomUUID(),
      ownerName: "Praveen",
      color: "#b518c7",
    });
  };

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto">
        <h1 className="mb-6 text-3xl font-bold">Shared Grid</h1>

        <div className="overflow-auto rounded-xl border bg-white">
          <GridCanvas tiles={data} onTileClick={handleTileClick} />
        </div>
      </div>
    </main>
  );
}

export default App;
