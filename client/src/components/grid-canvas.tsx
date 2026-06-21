import { useEffect, useRef } from "react";

import { CANVAS_SIZE, GRID_SIZE, TILE_SIZE } from "@/lib/constants";
import type { Tile } from "@/types/tile";

interface GridCanvasProps {
  tiles: Tile[];
}

export function GridCanvas({ tiles }: GridCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    for (const tile of tiles) {
      const row = Math.floor(tile.tileId / GRID_SIZE);
      const col = tile.tileId % GRID_SIZE;

      const x = col * TILE_SIZE;
      const y = row * TILE_SIZE;

      ctx.fillStyle = tile.color ?? "#ffffff";

      ctx.fillRect(
        x,
        y,
        TILE_SIZE,
        TILE_SIZE,
      );

      ctx.strokeStyle = "#e5e7eb";

      ctx.strokeRect(
        x,
        y,
        TILE_SIZE,
        TILE_SIZE,
      );
    }
  }, [tiles]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      className="rounded-lg border bg-white"
    />
  );
}