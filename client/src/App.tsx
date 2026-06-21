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

function App() {
  const { data, isLoading } = useTiles();
  const [user, setUser] = useState<User | null>(() => {
    return getUser();
  });


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
      <UsernameDialog
        open={!user}
        onSubmit={handleCreateUser}
      />
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
