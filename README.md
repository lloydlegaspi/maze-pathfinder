# Maze Pathfinder

A React-based visualization tool for pathfinding algorithms in maze environments, focusing on the A* search algorithm.

*This project is a collaborative activity for an Artificial Intelligence course.*

## Overview

Maze Pathfinder is an interactive web application that demonstrates how the A* search algorithm finds optimal paths through a maze. It visualizes the step-by-step process, showing the evaluation of nodes, the expanding frontier, and the final path discovery.

## Features

- **A* Search Algorithm**: Implementation of the A* search algorithm for finding the shortest path
- **Step-by-Step Visualization**: Detailed visualization of each step in the pathfinding process
- **Node Evaluation**: Shows g-score, h-score, and f-score calculations for each node
- **Path Reconstruction**: Displays the current best path at each step
- **Interactive Interface**: React-based UI for interactive exploration

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/maze-pathfinder.git
   cd maze-pathfinder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## How It Works

The application uses the A* search algorithm to find the shortest path from a start node `(1, 1)` to a goal node `(10, 15)` in a maze.

### A* Algorithm Implementation

The A* algorithm works by:

1. Maintaining a priority queue of nodes to explore, sorted by their f-score
2. For each node, calculating:
   - **g-score**: The cost to reach the node from the start
   - **h-score**: The estimated cost to reach the goal from the node (Manhattan distance)
   - **f-score**: The sum of g-score and h-score
3. Expanding nodes with the lowest f-score first
4. Updating scores when better paths are found
5. Reconstructing the path once the goal is reached

### Key Components

- **Priority Queue**: Efficiently manages node exploration order
- **Manhattan Distance Heuristic**: Estimates distance between nodes
- **Path Reconstruction**: Traces back from the goal to the start using parent pointers
- **Step Tracking**: Records algorithm progression for visualization
