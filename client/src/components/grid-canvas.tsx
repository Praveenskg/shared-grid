import { useEffect, useRef } from "react";

import { CANVAS_SIZE, GRID_SIZE, TILE_SIZE } from "@/lib/constants";

export function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        ctx.strokeStyle = "#e5e7eb";

        ctx.strokeRect(
          col * TILE_SIZE,
          row * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE,
        );
      }
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      className="border rounded-lg bg-white"
    />
  );
}