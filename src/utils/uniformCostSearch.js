import { nodesWithHeuristics } from './mazeData';
import { PriorityQueue } from './pQueue';
import { getNeighbors, getEdgeWeight, reconstructPath } from './aStarAlgorithm';

// Uniform Cost Search algorithm
export const uniformCostSearch = () => {
  const start = "(1, 1)";
  const goal = "(10, 15)";

  const openQueue = new PriorityQueue();
  const closedSet = new Set();
  const cameFrom = {};
  const gScore = {};

  // Initialize gScore for all nodes
  nodesWithHeuristics.forEach((node) => {
    gScore[node] = Infinity;
  });
  gScore[start] = 0;

  // Enqueue the start node
  openQueue.enqueue(start, gScore[start]);

  const steps = [];

  // Main loop
  while (!openQueue.isEmpty()) {
    const openSetBeforeDequeue = [...openQueue.items.map(q => q.element)];

    // Dequeue the node with the lowest gScore
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
        newFScore: better ? tentativeG : null
      });
    });

    // Log the current step
    steps.push({
      current,
      evaluation: `${current}: g(n)=${gScore[current].toFixed(1)} (path cost from start)`,
      openSet: openSetBeforeDequeue,
      currentOpenSet: openQueue.items.map(q => q.element),
      gScore: { ...gScore },
      fScore: { ...gScore }, // In UCS, fScore = gScore
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
        openQueue.enqueue(neighbor, tentativeG); // Priority is just the path cost
      }
    });
  }

  // No path found
  return { success: false, path: [], steps };
};