import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";
import { LinkedListQueue } from "../../../utils/LinkedListQueue";

export const bfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
  const traversedTiles: TileType[] = [];
  const visitedSet = new Set<string>();
  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  base.isTraversed = true;

  const queue = new LinkedListQueue<TileType>();
  queue.enqueue(base);
  visitedSet.add(`${base.row}-${base.col}`);

  while (!queue.isEmpty()) {
    const current = queue.dequeue()!;
    traversedTiles.push(current);

    if (isEqual(current, endTile)) break;

    const neighbors = getUntraversedNeighbors(grid, current);
    for (const neighbor of neighbors) {
      const key = `${neighbor.row}-${neighbor.col}`;
      if (!neighbor.isWall && !visitedSet.has(key)) {
        neighbor.distance = current.distance + 1;
        neighbor.parent = current;
        neighbor.isTraversed = true;
        queue.enqueue(neighbor);
        visitedSet.add(key);
      }
    }
  }

  const path: TileType[] = [];
  let tile = grid[endTile.row][endTile.col];
  while (tile !== null && tile.parent !== undefined) {
    tile.isPath = true;
    path.unshift(tile);
    tile = tile.parent!;
  }

  return { traversedTiles, path };
};
