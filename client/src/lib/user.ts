import type { User } from "@/types/user";

const STORAGE_KEY = "shared-grid-user";

export function getUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }
  const storedUser = localStorage.getItem(STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  return JSON.parse(storedUser);
}

export function saveUser(user: User) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(user),
  );
}