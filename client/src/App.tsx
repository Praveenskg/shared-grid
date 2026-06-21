import { GridCanvas } from "@/components/grid-canvas";
import { useTiles } from "@/hooks/use-tiles";
import { claimTile } from "@/lib/claim-tile";

import { socket } from "@/lib/socket";
import { queryClient } from "@/lib/query-client";
import type { Tile } from "./types/tile";
import { useEffect, useState } from "react";

import { getRandomColor } from "@/lib/random-color";
import { getUser, saveUser } from "@/lib/user";

import type { User } from "@/types/user";

import { UsernameDialog } from "@/components/username-dialog";
import { useOnlineCount } from "@/hooks/use-online-count";

import { OnlineCounter } from "@/components/online-counter";
import { TileDetailsCard } from "@/components/tile-details-card";
import { LeaderboardCard } from "@/components/leaderboard-card";

function App() {
  const { data, isLoading } = useTiles();
  const onlineCount = useOnlineCount();
  const [user, setUser] = useState<User | null>(() => {
    return getUser();
  });

  const [hoveredTile, setHoveredTile] = useState<Tile | null>(null);

  useEffect(() => {
    const handleTileUpdated = (updatedTile: Tile) => {
      queryClient.setQueryData(["tiles"], (oldTiles: Tile[] | undefined) => {
        if (!oldTiles) return [];

        return oldTiles.map((tile) =>
          tile.tileId === updatedTile.tileId ? updatedTile : tile,
        );
      });

      queryClient.invalidateQueries({
        queryKey: ["leaderboard"],
      });
    };

    socket.on("tile-updated", handleTileUpdated);

    return () => {
      socket.off("tile-updated", handleTileUpdated);
    };
  }, []);

  const handleCreateUser = (name: string) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      color: getRandomColor(),
    };

    saveUser(newUser);

    setUser(newUser);
  };

  const handleTileClick = async (tileId: number) => {
    if (!user) return;

    await claimTile({
      tileId,
      ownerId: user.id,
      ownerName: user.name,
      color: user.color,
    });
  };

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <UsernameDialog open={!user} onSubmit={handleCreateUser} />
      <div className="mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Shared Grid</h1>

          <OnlineCounter count={onlineCount} />
        </div>
        <div className="flex gap-6">
          <div className="overflow-auto rounded-xl border bg-white">
            <GridCanvas
              tiles={data}
              onTileClick={handleTileClick}
              onTileHover={setHoveredTile}
            />
          </div>

          <div className="space-y-4">
            <TileDetailsCard tile={hoveredTile} />

            <LeaderboardCard />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
