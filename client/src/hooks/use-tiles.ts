import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import type { Tile } from "@/types/tile";

interface TilesResponse {
  success: boolean;
  data: Tile[];
}

export function useTiles() {
  return useQuery({
    queryKey: ["tiles"],
    queryFn: async () => {
      const response = await api.get<TilesResponse>("/tiles");

      return response.data.data;
    },
  });
}