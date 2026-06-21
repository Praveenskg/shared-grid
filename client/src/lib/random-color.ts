const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

export function getRandomColor() {
  return COLORS[
    Math.floor(Math.random() * COLORS.length)
  ];
}