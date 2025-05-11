# AlgoFlow

**AlgoFlow** is an interactive pathfinding and maze generation visualizer built using modern web technologies. It allows users to explore how different algorithms work through smooth animations and full user control over speed, algorithms and wall placement.

## Technologies Used

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**

## Live Demo
https://github.com/user-attachments/assets/6bc3e608-74dc-41b7-b65d-55f630c674b4

---

## Features

- **Visualize Pathfinding Algorithms**: BFS, DFS, Dijkstra's, and A* (with heuristics)
- **Maze Generation**: Create walls manually or generate random mazes using:
  - Binary Tree algorithm
  - Recursive Division algorithm
- **Adjustable Animation Speeds**: Choose between slow, medium, or fast
- **Interactive UI**: Click to add/remove walls and reposition start/end tiles

---

## 🌐 Live Demo

[Try it now](https://algoflow-patricka.netlify.app/)

---

## Algorithms Explained

### Pathfinding Algorithms

#### 🔹 Breadth-First Search (BFS)
- **Type**: Unweighted
- **Time Complexity**: O(V + E) (V is number of Tiles and E is number of neighbours for each tile = (4V))
- **Guarantees Shortest Path**: ✅
- **How it works**: Explores all neighbors of a node before moving to the next level. Think of it as expanding outward in circles.

#### 🔹 Depth-First Search (DFS)
- **Type**: Unweighted
- **Time Complexity**: O(V + E)
- **Guarantees Shortest Path**: ❌
- **How it works**: Explores one neighbor fully before backtracking. May go deep into one branch before trying alternatives.

#### 🔹 Dijkstra’s Algorithm
- **Type**: Weighted (but all weights = 1 in grid)
- **Time Complexity**: O((V + E) log V)
- **Guarantees Shortest Path**: ✅
- **How it works**: Uses a priority queue to explore the closest node first (based on total distance from start). Expands outward intelligently.

#### 🔹 A* Search
- **Type**: Weighted with Heuristic
- **Time Complexity**: O((V + E) log V)
- **Guarantees Shortest Path**: ✅ (with admissible heuristic like Manhattan distance)
- **How it works**: Like Dijkstra’s, but adds a **heuristic estimate** to prioritize nodes that are closer to the goal. Much faster.

#### 🔹 Greedy Best-First Search  
- **Type**: Heuristic-Only (Weighted)
- **Time Complexity**: O((V + E) log V)
- **Guarantees Shortest Path**: ❌  
- **How it works**: Prioritizes nodes **purely based on their estimated distance to the goal** (heuristic). It ignores the actual cost to reach a node, making it faster but potentially inaccurate. Greedy is fast and visually efficient, but may take suboptimal paths. 


---

### Maze Generation Algorithms

#### Manual Wall Placement
- **Description**: Click any grid tile to add or remove a wall. Great for testing specific cases.

#### Binary Tree Maze
- **Time Complexity**: O(V)
- **Description**: A simple randomized algorithm that creates a maze by carving paths with only right and down directions. Fast but not very complex.

#### Recursive Division
- **Time Complexity**: O(V log V)
- **Description**: Recursively divides the grid into sections with walls and openings. Creates visually interesting and solvable mazes.

---

### Acknowledgements

Big thanks to TechPrep for his incredible tutorials on different aspects of constructing grids and implementing algorithms on grids.
