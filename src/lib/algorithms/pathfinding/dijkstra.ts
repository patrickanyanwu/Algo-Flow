import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { isEqual } from "../../../utils/helpers";
import { MinHeap } from "../../../utils/minHeap";
import { GridType, TileType } from "../../../utils/types";

export const dijkstra = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const traversedTiles = [];
  const start = grid[startTile.row][startTile.col];
  start.distance = 0;

  const heap = new MinHeap<TileType>();
  heap.insert(start, 0);

  while (!heap.isEmpty()) {
    const current = heap.extractMin();
    if (!current || current.isTraversed || current.isWall) continue;

    current.isTraversed = true;
    traversedTiles.push(current);

    if (isEqual(current, endTile)) break;

    const neighbors = getUntraversedNeighbors(grid, current);
    for (const neighbor of neighbors) {
      const newDistance = current.distance + 1;
      if (newDistance < neighbor.distance) {
        neighbor.distance = newDistance;
        neighbor.parent = current;
        heap.insert(neighbor, newDistance);
      }
    }
  }

  const path = [];
  let current = grid[endTile.row][endTile.col];
  while (current !== null && current.parent !== undefined) {
    path.unshift(current);
    current.isPath = true;
    current = current.parent!;
  }

  return { traversedTiles, path };
};
