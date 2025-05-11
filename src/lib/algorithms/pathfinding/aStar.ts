import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { isEqual } from "../../../utils/helpers";
import { initFunctionCost, initHeuristicCost } from "../../../utils/heuristics";
import { MinHeapAstar } from "../../../utils/MinHeapAstar";
import { GridType, TileType } from "../../../utils/types";

export const aStar = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const traversedTiles: TileType[] = [];
  const heuristicCost = initHeuristicCost(grid, endTile);
  const functionCost = initFunctionCost(); // f(n) = g(n) + h(n)

  const openSet = new MinHeapAstar<TileType>();
  const inOpenSet = new Set<string>();

  const start = grid[startTile.row][startTile.col];
  start.distance = 0;
  functionCost[start.row][start.col] =
    start.distance + heuristicCost[start.row][start.col];

  openSet.insert(start, functionCost[start.row][start.col]);
  inOpenSet.add(`${start.row}-${start.col}`);

  while (!openSet.isEmpty()) {
    const current = openSet.extractMin()!;
    const key = `${current.row}-${current.col}`;
    inOpenSet.delete(key);

    if (current.isWall || current.isTraversed) continue;

    current.isTraversed = true;
    traversedTiles.push(current);

    if (isEqual(current, endTile)) break;

    const neighbors = getUntraversedNeighbors(grid, current);
    for (const neighbor of neighbors) {
      if (neighbor.isWall || neighbor.isTraversed) continue;

      const tentativeG = current.distance + 1;
      const hCost = heuristicCost[neighbor.row][neighbor.col];
      const fCost = tentativeG + hCost;

      if (tentativeG < neighbor.distance) {
        neighbor.distance = tentativeG;
        neighbor.parent = current;
        functionCost[neighbor.row][neighbor.col] = fCost;

        const neighborKey = `${neighbor.row}-${neighbor.col}`;
        if (!inOpenSet.has(neighborKey)) {
          openSet.insert(neighbor, fCost);
          inOpenSet.add(neighborKey);
        }
      }
    }
  }

  // Build path
  const path: TileType[] = [];
  let current = grid[endTile.row][endTile.col];
  while (current !== null && current.parent !== undefined) {
    current.isPath = true;
    path.unshift(current);
    current = current.parent!;
  }

  return { traversedTiles, path };
};
