import { getUntraversedNeighbors } from "../../../utils/getUntraversedNeighbors";
import { isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

export const dfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
  const traversedTiles: TileType[] = [];
  const visited = new Set<string>();

  const base = grid[startTile.row][startTile.col];
  base.distance = 0;
  base.isTraversed = true;

  const stack: TileType[] = [base];
  visited.add(`${base.row}-${base.col}`);

  while (stack.length > 0) {
    const current = stack.pop()!;
    traversedTiles.push(current);

    if (isEqual(current, endTile)) break;

    const neighbors = getUntraversedNeighbors(grid, current);
    for (const neighbor of neighbors) {
      const key = `${neighbor.row}-${neighbor.col}`;
      if (!neighbor.isWall && !visited.has(key)) {
        neighbor.distance = current.distance + 1;
        neighbor.parent = current;
        neighbor.isTraversed = true;
        stack.push(neighbor);
        visited.add(key);
      }
    }
  }

  // Trace path back from end
  const path: TileType[] = [];
  let current = grid[endTile.row][endTile.col];
  while (current !== null && current.parent !== undefined) {
    current.isPath = true;
    path.unshift(current);
    current = current.parent!;
  }

  return { traversedTiles, path };
};
