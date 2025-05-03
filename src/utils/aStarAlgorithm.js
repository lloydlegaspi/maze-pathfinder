import { nodesWithHeuristics, edges, edgeWeights } from './mazeData';

// Calculate Manhattan distance for heuristic
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

// Get neighbors of a node based on graph edges
export const getNeighbors = (node) => {
  const neighbors = [];

  edges.forEach(([a, b]) => {
    if (a === node) neighbors.push(b);
    if (b === node) neighbors.push(a);
  });

  return neighbors;
};

// Reconstruct path from start to current based on cameFrom map
export const reconstructPath = (cameFrom, current) => {
  const totalPath = [current];
  while (cameFrom[current]) {
    current = cameFrom[current];
    totalPath.unshift(current);
  }
  return totalPath;
};

// A* search algorithm implementation
export const aStarSearch = () => {
  const start = "(1, 1)";
  const goal = "(10, 15)";
  const heuristics = calculateHeuristics();

  const openSet = [start];
  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  // Initialize with infinity for all nodes
  nodesWithHeuristics.forEach((node) => {
    gScore[node] = Infinity;
    fScore[node] = Infinity;
  });

  gScore[start] = 0;
  fScore[start] = heuristics[start];

  const steps = [];
  let currentStep = {
    current: null,
    openSet: [...openSet],
    gScore: { ...gScore },
    fScore: { ...fScore },
    path: [],
    evaluation: null,
    neighbors: [],
    neighborEvaluations: [],
  };

  while (openSet.length > 0) {
    // Find node with lowest fScore
    let lowestFScore = Infinity;
    let current = null;

    openSet.forEach((node) => {
      if (fScore[node] < lowestFScore) {
        lowestFScore = fScore[node];
        current = node;
      }
    });

    // Record step before processing
    currentStep = {
      current,
      openSet: [...openSet],
      gScore: { ...gScore },
      fScore: { ...fScore },
      path: reconstructPath(cameFrom, current),
      evaluation: `Selected ${current}: f(n) = ${fScore[current].toFixed(1)} = g(n): ${gScore[current].toFixed(1)} + h(n): ${heuristics[current]}`,
      neighbors: [],
      neighborEvaluations: [],
    };

    // Goal reached
    if (current === goal) {
      steps.push(currentStep);
      return {
        success: true,
        path: reconstructPath(cameFrom, current),
        steps,
      };
    }

    // Remove current from openSet
    openSet.splice(openSet.indexOf(current), 1);

    // Process neighbors
    const neighbors = getNeighbors(current);
    currentStep.neighbors = [...neighbors];

    neighbors.forEach((neighbor) => {
      // Calculate tentative gScore
      const tentativeGScore = gScore[current] + getEdgeWeight(current, neighbor);

      const neighborEval = {
        neighbor,
        tentativeGScore,
        currentGScore: gScore[neighbor],
        better: tentativeGScore < gScore[neighbor],
        newFScore: null,
      };

      if (tentativeGScore < gScore[neighbor]) {
        // This path is better
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] = tentativeGScore + heuristics[neighbor];
        neighborEval.newFScore = fScore[neighbor];

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }

      currentStep.neighborEvaluations.push(neighborEval);
    });

    steps.push(currentStep);
  }

  // No path found
  return { success: false, path: [], steps };
};

