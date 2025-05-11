import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { isEqual } from "../../../utils/helpers";
import { initHeuristicCost } from "../../../utils/heuristics";
import { MinHeap } from "../../../utils/minHeap";
import { GridType, TileType } from "../../../utils/types";

export function greedy(grid: GridType, startTile: TileType, endTile: TileType) {
  const traversedTiles: TileType[] = [];
  const heuristicCost = initHeuristicCost(grid, endTile);

  const start = grid[startTile.row][startTile.col];
  start.distance = 0;

  const openSet = new MinHeap<TileType>();
  const inOpenSet = new Set<string>();
  openSet.insert(start, heuristicCost[start.row][start.col]);
  inOpenSet.add(`${start.row}-${start.col}`);

  while (!openSet.isEmpty()) {
    const current = openSet.extractMin()!;
    inOpenSet.delete(`${current.row}-${current.col}`);

    if (current.isWall) continue;
    if (current.isTraversed) continue;

    current.isTraversed = true;
    traversedTiles.push(current);

    if (isEqual(current, endTile)) break;

    const neighbors = getUntraversedNeighbors(grid, current);
    for (const neighbor of neighbors) {
      if (neighbor.isTraversed || neighbor.isWall) continue;

      if (!inOpenSet.has(`${neighbor.row}-${neighbor.col}`)) {
        neighbor.parent = current;
        openSet.insert(neighbor, heuristicCost[neighbor.row][neighbor.col]);
        inOpenSet.add(`${neighbor.row}-${neighbor.col}`);
      }
    }
  }

  const path: TileType[] = [];
  let current = grid[endTile.row][endTile.col];
  while (current !== null && current.parent !== undefined) {
    current.isPath = true;
    path.unshift(current);
    current = current.parent!;
  }

  return { traversedTiles, path };
}
