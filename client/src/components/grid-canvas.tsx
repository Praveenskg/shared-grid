import { useEffect, useMemo, useRef, useState } from "react";

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

  const [scale, setScale] = useState(1);

  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });

  const isDraggingRef = useRef(false);

  const dragStartRef = useRef({
    x: 0,
    y: 0,
  });

  const tileMap = useMemo(() => {
    return new Map(
      tiles.map((tile) => [tile.tileId, tile]),
    );
  }, [tiles]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height,
    );

    ctx.save();

    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

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

    ctx.restore();
  }, [tiles, scale, offset]);

  const getGridCoordinates = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return null;
    }

    const rect = canvas.getBoundingClientRect();

    const x =
      (event.clientX - rect.left - offset.x) /
      scale;

    const y =
      (event.clientY - rect.top - offset.y) /
      scale;

    return { x, y };
  };

  const handleClick = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    if (isDraggingRef.current) {
      return;
    }

    const coords =
      getGridCoordinates(event);

    if (!coords) return;

    const col = Math.floor(
      coords.x / TILE_SIZE,
    );

    const row = Math.floor(
      coords.y / TILE_SIZE,
    );

    const tileId =
      row * GRID_SIZE + col;

    if (
      tileId < 0 ||
      tileId >= GRID_SIZE * GRID_SIZE
    ) {
      return;
    }

    onTileClick(tileId);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    if (isDraggingRef.current) {
      const dx =
        event.clientX -
        dragStartRef.current.x;

      const dy =
        event.clientY -
        dragStartRef.current.y;

      dragStartRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      setOffset((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));

      return;
    }

    const coords =
      getGridCoordinates(event);

    if (!coords) return;

    const col = Math.floor(
      coords.x / TILE_SIZE,
    );

    const row = Math.floor(
      coords.y / TILE_SIZE,
    );

    const tileId =
      row * GRID_SIZE + col;

    onTileHover(
      tileMap.get(tileId) ?? null,
    );
  };

  const handleMouseLeave = () => {
    onTileHover(null);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    isDraggingRef.current = true;

    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (
    event: React.WheelEvent<HTMLCanvasElement>,
  ) => {
    event.preventDefault();

    setScale((current) => {
      const zoomFactor =
        event.deltaY > 0
          ? 0.9
          : 1.1;

      return Math.min(
        5,
        Math.max(
          0.5,
          current * zoomFactor,
        ),
      );
    });
  };

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      className="cursor-grab rounded-lg border bg-white active:cursor-pointer w-full h-full"
    />
  );
}