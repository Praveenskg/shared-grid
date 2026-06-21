import { useEffect, useMemo, useRef } from "react";

import { CANVAS_SIZE, GRID_SIZE, TILE_SIZE } from "@/lib/constants";
import type { Tile } from "@/types/tile";

interface GridCanvasProps {
  tiles: Tile[];
  onTileClick: (tileId: number) => void;
  onTileHover: (tile: Tile | null) => void;
}

export function GridCanvas({
  tiles,
  onTileClick,
  onTileHover,
}: GridCanvasProps) {
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


  const handleClick = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / TILE_SIZE);
    const row = Math.floor(y / TILE_SIZE);

    const tileId = row * GRID_SIZE + col;

    onTileClick(tileId);
  };

  const tileMap = useMemo(() => {
    return new Map(
      tiles.map((tile) => [tile.tileId, tile]),
    );
  }, [tiles]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / TILE_SIZE);
    const row = Math.floor(y / TILE_SIZE);

    const tileId = row * GRID_SIZE + col;

    onTileHover(tileMap.get(tileId) ?? null);
  };

  const handleMouseLeave = () => {
    onTileHover(null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer rounded-lg border bg-white"
    />
    
    
  );
}