import { nodesWithHeuristics, edges, edgeWeights } from './mazeData';
import { PriorityQueue } from '../utils/pQueue';

// Build adjacency list from edges
const buildAdjacencyList = () => {
  const adjacencyList = {};
  edges.forEach(([a, b]) => {
    if (!adjacencyList[a]) adjacencyList[a] = [];
    if (!adjacencyList[b]) adjacencyList[b] = [];
    adjacencyList[a].push(b);
    adjacencyList[b].push(a);
  });
  return adjacencyList;
};

const adjacencyList = buildAdjacencyList();

// Manhattan distance calculation
export const calculateManhattanDistance = (pos1, pos2) => {
  const [row1, col1] = pos1.replace(/[()]/g, "").split(", ").map(Number);
  const [row2, col2] = pos2.replace(/[()]/g, "").split(", ").map(Number);
  return Math.abs(row1 - row2) + Math.abs(col1 - col2);
};

// Calculate heuristic values for all nodes
export const calculateHeuristics = () => {
  const goal = "(10, 15)";
  const heuristics = {};

  nodesWithHeuristics.forEach((node) => {
    heuristics[node] = calculateManhattanDistance(node, goal);
  });

  return heuristics;
};

// Get weight between two nodes
export const getEdgeWeight = (node1, node2) => {
  const key1 = `${node1}-${node2}`;
  const key2 = `${node2}-${node1}`;
  return edgeWeights[key1] || edgeWeights[key2] || Infinity;
};

// Get neighbors of a node
export const getNeighbors = (node) => {
  return adjacencyList[node] || [];
};

// Reconstruct path from start to current node using the cameFrom map
export const reconstructPath = (cameFrom, current) => {
  const totalPath = [current];
  while (cameFrom[current]) {
    current = cameFrom[current];
    totalPath.unshift(current);
  }
  return totalPath;
};

// A* search algorithm
export const aStarSearch = () => {
  const start = "(1, 1)";
  const goal = "(10, 15)";
  const heuristics = calculateHeuristics();

  const openQueue = new PriorityQueue();
  const closedSet = new Set();
  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  // Initialize gScore and fScore for all nodes
  nodesWithHeuristics.forEach((node) => {
    gScore[node] = Infinity;
    fScore[node] = Infinity;
  });
  gScore[start] = 0;
  fScore[start] = heuristics[start];

  // Enqueue the start node
  openQueue.enqueue(start, fScore[start]);

  const steps = [];

  // Main loop
  while (!openQueue.isEmpty()) { // Continue until the open set is empty
    const openSetBeforeDequeue = [...openQueue.items.map(q => q.element)];

    // Dequeue the node with the lowest fScore
    const { element: current } = openQueue.dequeue();

    // Skip if already processed
    if (closedSet.has(current)) continue;

    // Evaluate neighbors
    const neighbors = getNeighbors(current);
    const neighborEvaluations = [];
    
    neighbors.forEach(neighbor => {
      if (closedSet.has(neighbor)) {
        neighborEvaluations.push({
          neighbor,
          skipped: true
        });
        return;
      }
      
      const tentativeG = gScore[current] + getEdgeWeight(current, neighbor);
      const better = tentativeG < gScore[neighbor];
      
      neighborEvaluations.push({
        neighbor,
        skipped: false,
        better,
        tentativeGScore: tentativeG,
        currentGScore: gScore[neighbor],
        newFScore: better ? tentativeG + heuristics[neighbor] : null
      });
    });

    // Log the current step
    steps.push({
      current,
      evaluation: `${current}: g(n)=${gScore[current].toFixed(1)} + h(n)=${heuristics[current].toFixed(1)} = f(n)=${fScore[current].toFixed(1)}`,
      openSet: openSetBeforeDequeue,
      currentOpenSet: openQueue.items.map(q => q.element),
      gScore: { ...gScore },
      fScore: { ...fScore },
      path: reconstructPath(cameFrom, current),
      neighbors: neighbors,
      neighborEvaluations: neighborEvaluations
    });

    // Check goal condition
    if (current === goal) {
      return {
        success: true,
        path: reconstructPath(cameFrom, current),
        steps,
      };
    }

    closedSet.add(current);

    // Process neighbors
    getNeighbors(current).forEach((neighbor) => {
      if (closedSet.has(neighbor)) return;

      const tentativeG = gScore[current] + getEdgeWeight(current, neighbor);
      if (tentativeG < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeG;
        fScore[neighbor] = tentativeG + heuristics[neighbor];
        openQueue.enqueue(neighbor, fScore[neighbor]);
      }
    });
  }

  // No path found
  return { success: false, path: [], steps };
};