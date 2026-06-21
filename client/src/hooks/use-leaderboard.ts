import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import type { LeaderboardUser } from "@/types/leaderboard";

interface Response {
  success: boolean;
  data: LeaderboardUser[];
}

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const response =
        await api.get<Response>(
          "/stats/leaderboard",
        );

      return response.data.data;
    },
  });
}