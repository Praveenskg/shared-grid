import { User } from "lucide-react";

import { useUserStats } from "@/hooks/use-user-stats";

interface Props {
  userId?: string;
}

export function CurrentUserCard({
  userId,
}: Props) {
  const { data } =
    useUserStats(userId);

  if (!data) {
    return null;
  }

  return (
    <div className="w-80 rounded-xl border bg-white p-4">
      <div className="mb-4 flex items-center gap-2">
        <User className="h-5 w-5" />

        <h2 className="font-semibold">
          Your Profile
        </h2>
      </div>

      <div className="space-y-3">
        <div>
          Name: {data.ownerName}
        </div>

        <div className="flex items-center gap-2">
          Color

          <div
            className="h-4 w-4 rounded-full"
            style={{
              backgroundColor:
                data.color,
            }}
          />
        </div>

        <div>
          Tiles Owned:{" "}
          {data.tileCount}
        </div>

        <div>
          Rank: #{data.rank}
        </div>
      </div>
    </div>
  );
}