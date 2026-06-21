import { Tile } from "../models/tile.js";


const GRID_SIZE = 50;

export async function seedTiles() {
  const count = await Tile.countDocuments();

  if (count > 0) {
    return;
  }

  const tiles = [];

  for (let tileId = 0; tileId < GRID_SIZE * GRID_SIZE; tileId++) {
    tiles.push({
      tileId,
    });
  }

  await Tile.insertMany(tiles);

  console.log(`Seeded ${tiles.length} tiles`);
}