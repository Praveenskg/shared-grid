import { api } from "@/lib/api";

export async function resetGame() {
  const response = await api.post(
    "/admin/reset",
  );

  return response.data;
}