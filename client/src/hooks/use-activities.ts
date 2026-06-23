import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";

import type { Activity } from "@/types/activity";

interface Response {
  success: boolean;
  data: Activity[];
}

export function useActivities() {
  return useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await api.get<Response>("/activities");

      return response.data.data;
    },
  });
}
