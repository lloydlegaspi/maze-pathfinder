import { nodesWithHeuristics } from './mazeData';
import { PriorityQueue } from './pQueue';
import { getNeighbors, getEdgeWeight, reconstructPath, calculateHeuristics } from './aStarAlgorithm';

// Greedy Best First Search algorithm
export const greedyBestFirstSearch = () => {
  const start = "(1, 1)";
  const goal = "(10, 15)";
  const heuristics = calculateHeuristics();

  const openQueue = new PriorityQueue();
  const closedSet = new Set();
  const cameFrom = {};
  const gScore = {};

  // Initialize gScore for all nodes
  nodesWithHeuristics.forEach((node) => {
    gScore[node] = Infinity;
  });
  gScore[start] = 0;

  // Enqueue the start node with priority based only on heuristic value
  openQueue.enqueue(start, heuristics[start]);

  const steps = [];

  // Main loop
  while (!openQueue.isEmpty()) {
    const openSetBeforeDequeue = [...openQueue.items.map(q => q.element)];

    // Dequeue the node with the lowest heuristic value
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
        newFScore: heuristics[neighbor] // Only the heuristic value
      });
    });

    // Log the current step
    steps.push({
      current,
      evaluation: `${current}: h(n)=${heuristics[current].toFixed(1)} = f(n)=${heuristics[current].toFixed(1)}`,
      openSet: openSetBeforeDequeue,
      currentOpenSet: openQueue.items.map(q => q.element),
      gScore: { ...gScore },
      fScore: { ...heuristics }, // Use heuristics directly as fScore
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
      
      // Update path information if better path
      if (tentativeG < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeG;
        
        if (!openSetBeforeDequeue.includes(neighbor)) {
          openQueue.enqueue(neighbor, heuristics[neighbor]);
        }
      } else if (!openSetBeforeDequeue.includes(neighbor)) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeG;
        openQueue.enqueue(neighbor, heuristics[neighbor]);
      }
    });
  }

  // No path found
  return { success: false, path: [], steps };
};