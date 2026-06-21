import { Trophy } from "lucide-react";

import { useLeaderboard } from "@/hooks/use-leaderboard";

export function LeaderboardCard() {
  const { data } = useLeaderboard();

  return (
    <div className="w-80 rounded-xl border bg-white p-4">
      <div className="mb-4 flex items-center gap-2">
        <Trophy className="h-5 w-5" />

        <h2 className="font-semibold">
          Leaderboard
        </h2>
      </div>

      <div className="space-y-3">
        {data?.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span>
                #{index + 1}
              </span>

              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    user.color,
                }}
              />

              <span>
                {user.ownerName}
              </span>
            </div>

            <span className="font-medium">
              {user.tileCount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}