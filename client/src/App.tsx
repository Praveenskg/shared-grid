import { useEffect, useState } from "react";

import { Navbar } from "./components/navbar";
import { GridCanvas } from "@/components/grid-canvas";
import { UsernameDialog } from "@/components/username-dialog";
import { LeaderboardCard } from "@/components/leaderboard-card";
import { TileDetailsCard } from "@/components/tile-details-card";
import { CurrentUserCard } from "@/components/current-user-card";
import { RecentActivityCard } from "@/components/recent-activity-card";

import { useTiles } from "@/hooks/use-tiles";

import { claimTile } from "@/lib/claim-tile";
import { getRandomColor } from "@/lib/random-color";
import { queryClient } from "@/lib/query-client";
import { socket } from "@/lib/socket";
import { getUser, saveUser } from "@/lib/user";

import type { Tile } from "@/types/tile";
import type { User } from "@/types/user";
import type { Activity } from "@/types/activity";

function App() {
  const { data, isLoading } = useTiles();

  const [user, setUser] = useState<User | null>(() => getUser());
  const [hoveredTile, setHoveredTile] = useState<Tile | null>(null);

  useEffect(() => {
    const handleTileUpdated = (updatedTile: Tile) => {
      queryClient.setQueryData(["tiles"], (oldTiles: Tile[] | undefined) => {
        if (!oldTiles) {
          return [];
        }

        return oldTiles.map((tile) =>
          tile.tileId === updatedTile.tileId ? updatedTile : tile,
        );
      });

      queryClient.invalidateQueries({
        queryKey: ["leaderboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-stats"],
      });
    };

    const handleActivityCreated = (activity: Activity) => {
      queryClient.setQueryData<Activity[]>(
        ["activities"],
        (oldActivities = []) => {
          return [activity, ...oldActivities].slice(0, 5);
        },
      );
    };

    socket.on("tile-updated", handleTileUpdated);

    socket.on("activity-created", handleActivityCreated);

    return () => {
      socket.off("tile-updated", handleTileUpdated);

      socket.off("activity-created", handleActivityCreated);
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
    if (!user) {
      return;
    }

    await claimTile({
      tileId,
      ownerId: user.id,
      ownerName: user.name,
      color: user.color,
    });
  };

  if (isLoading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <UsernameDialog open={!user} onSubmit={handleCreateUser} />
      <Navbar />
      <div className="container mx-auto  px-4 py-6">
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <div className="overflow-auto  border bg-card">
            <GridCanvas
              tiles={data}
              onTileClick={handleTileClick}
              onTileHover={setHoveredTile}
            />
          </div>

          <div className="space-y-4">
            <TileDetailsCard tile={hoveredTile} />
            <LeaderboardCard />
            <CurrentUserCard user={user} />
            <RecentActivityCard />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
