import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import type { UserStats } from "@/types/stats";

interface Response {
  success: boolean;
  data: UserStats;
}

export function useUserStats(
  userId?: string,
) {
  return useQuery({
    queryKey: ["user-stats", userId],
    enabled: !!userId,
    queryFn: async () => {
      const response =
        await api.get<Response>(
          `/stats/user/${userId}`,
        );

      return response.data.data;
    },
  });
}