import { useState } from "react";

const MazePathfinder = () => {
  // Maze data
  const mazeData = {
    "(1, 1)": { E: 1, W: 0, N: 0, S: 1 },
    "(2, 1)": { E: 1, W: 0, N: 1, S: 0 },
    "(3, 1)": { E: 1, W: 0, N: 0, S: 0 },
    "(4, 1)": { E: 1, W: 0, N: 0, S: 1 },
    "(5, 1)": { E: 0, W: 0, N: 1, S: 1 },
    "(6, 1)": { E: 0, W: 0, N: 1, S: 1 },
    "(7, 1)": { E: 1, W: 0, N: 1, S: 1 },
    "(8, 1)": { E: 0, W: 0, N: 1, S: 1 },
    "(9, 1)": { E: 0, W: 0, N: 1, S: 1 },
    "(10, 1)": { E: 1, W: 0, N: 1, S: 0 },
    "(1, 2)": { E: 1, W: 1, N: 0, S: 0 },
    "(2, 2)": { E: 0, W: 1, N: 0, S: 1 },
    "(3, 2)": { E: 0, W: 1, N: 1, S: 0 },
    "(4, 2)": { E: 1, W: 1, N: 0, S: 1 },
    "(5, 2)": { E: 1, W: 0, N: 1, S: 1 },
    "(6, 2)": { E: 0, W: 0, N: 1, S: 1 },
    "(7, 2)": { E: 1, W: 1, N: 1, S: 0 },
    "(8, 2)": { E: 0, W: 0, N: 0, S: 1 },
    "(9, 2)": { E: 0, W: 0, N: 1, S: 1 },
    "(10, 2)": { E: 1, W: 1, N: 1, S: 0 },
    "(1, 3)": { E: 1, W: 1, N: 0, S: 0 },
    "(2, 3)": { E: 1, W: 0, N: 0, S: 1 },
    "(3, 3)": { E: 1, W: 0, N: 1, S: 0 },
    "(4, 3)": { E: 1, W: 1, N: 0, S: 0 },
    "(5, 3)": { E: 1, W: 1, N: 0, S: 0 },
    "(6, 3)": { E: 1, W: 0, N: 0, S: 1 },
    "(7, 3)": { E: 0, W: 1, N: 1, S: 0 },
    "(8, 3)": { E: 1, W: 0, N: 0, S: 1 },
    "(9, 3)": { E: 1, W: 0, N: 1, S: 1 },
    "(10, 3)": { E: 1, W: 1, N: 1, S: 0 },
    "(1, 4)": { E: 1, W: 1, N: 0, S: 1 },
    "(2, 4)": { E: 0, W: 1, N: 1, S: 0 },
    "(3, 4)": { E: 1, W: 1, N: 0, S: 0 },
    "(4, 4)": { E: 1, W: 1, N: 0, S: 0 },
    "(5, 4)": { E: 1, W: 1, N: 0, S: 0 },
    "(6, 4)": { E: 0, W: 1, N: 0, S: 1 },
    "(7, 4)": { E: 0, W: 0, N: 1, S: 0 },
    "(8, 4)": { E: 1, W: 1, N: 0, S: 0 },
    "(9, 4)": { E: 1, W: 1, N: 0, S: 0 },
    "(10, 4)": { E: 0, W: 1, N: 0, S: 0 },
    "(1, 5)": { E: 1, W: 1, N: 0, S: 0 },
    "(2, 5)": { E: 1, W: 0, N: 0, S: 1 },
    "(3, 5)": { E: 0, W: 1, N: 1, S: 0 },
    "(4, 5)": { E: 1, W: 1, N: 0, S: 0 },
    "(5, 5)": { E: 0, W: 1, N: 0, S: 1 },
    "(6, 5)": { E: 0, W: 0, N: 1, S: 1 },
    "(7, 5)": { E: 0, W: 0, N: 1, S: 1 },
    "(8, 5)": { E: 0, W: 1, N: 1, S: 0 },
    "(9, 5)": { E: 0, W: 1, N: 0, S: 1 },
    "(10, 5)": { E: 1, W: 0, N: 1, S: 0 },
    "(1, 6)": { E: 1, W: 1, N: 0, S: 1 },
    "(2, 6)": { E: 0, W: 1, N: 1, S: 1 },
    "(3, 6)": { E: 1, W: 0, N: 1, S: 0 },
    "(4, 6)": { E: 1, W: 1, N: 0, S: 0 },
    "(5, 6)": { E: 0, W: 0, N: 0, S: 1 },
    "(6, 6)": { E: 1, W: 0, N: 1, S: 1 },
    "(7, 6)": { E: 0, W: 0, N: 1, S: 1 },
    "(8, 6)": { E: 0, W: 0, N: 1, S: 0 },
    "(9, 6)": { E: 1, W: 0, N: 0, S: 1 },
    "(10, 6)": { E: 1, W: 1, N: 1, S: 0 },
    "(1, 7)": { E: 1, W: 1, N: 0, S: 0 },
    "(2, 7)": { E: 1, W: 0, N: 0, S: 0 },
    "(3, 7)": { E: 0, W: 1, N: 0, S: 1 },
    "(4, 7)": { E: 0, W: 1, N: 1, S: 1 },
    "(5, 7)": { E: 1, W: 0, N: 1, S: 1 },
    "(6, 7)": { E: 0, W: 1, N: 1, S: 0 },
    "(7, 7)": { E: 1, W: 0, N: 0, S: 1 },
    "(8, 7)": { E: 0, W: 0, N: 1, S: 1 },
    "(9, 7)": { E: 0, W: 1, N: 1, S: 0 },
    "(10, 7)": { E: 1, W: 1, N: 0, S: 0 },
    "(1, 8)": { E: 0, W: 1, N: 0, S: 1 },
    "(2, 8)": { E: 1, W: 1, N: 1, S: 0 },
    "(3, 8)": { E: 1, W: 0, N: 0, S: 0 },
    "(4, 8)": { E: 1, W: 0, N: 0, S: 1 },
    "(5, 8)": { E: 1, W: 1, N: 1, S: 1 },
    "(6, 8)": { E: 0, W: 0, N: 1, S: 1 },
    "(7, 8)": { E: 0, W: 1, N: 1, S: 1 },
    "(8, 8)": { E: 1, W: 0, N: 1, S: 1 },
    "(9, 8)": { E: 0, W: 0, N: 1, S: 1 },
    "(10, 8)": { E: 0, W: 1, N: 1, S: 0 },
    "(1, 9)": { E: 1, W: 0, N: 0, S: 0 },
    "(2, 9)": { E: 0, W: 1, N: 0, S: 1 },
    "(3, 9)": { E: 1, W: 1, N: 1, S: 0 },
    "(4, 9)": { E: 1, W: 1, N: 0, S: 0 },
    "(5, 9)": { E: 0, W: 1, N: 0, S: 0 },
    "(6, 9)": { E: 1, W: 0, N: 0, S: 1 },
    "(7, 9)": { E: 1, W: 0, N: 1, S: 1 },
    "(8, 9)": { E: 1, W: 1, N: 1, S: 0 },
    "(9, 9)": { E: 0, W: 0, N: 0, S: 1 },
    "(10, 9)": { E: 1, W: 0, N: 1, S: 0 },
    "(1, 10)": { E: 0, W: 1, N: 0, S: 1 },
    "(2, 10)": { E: 0, W: 0, N: 1, S: 1 },
    "(3, 10)": { E: 1, W: 1, N: 1, S: 0 },
    "(4, 10)": { E: 0, W: 1, N: 0, S: 1 },
    "(5, 10)": { E: 0, W: 0, N: 1, S: 1 },
    "(6, 10)": { E: 0, W: 1, N: 1, S: 0 },
    "(7, 10)": { E: 1, W: 1, N: 0, S: 0 },
    "(8, 10)": { E: 0, W: 1, N: 0, S: 1 },
    "(9, 10)": { E: 0, W: 0, N: 1, S: 1 },
    "(10, 10)": { E: 1, W: 1, N: 1, S: 0 },
    "(1, 11)": { E: 1, W: 0, N: 0, S: 1 },
    "(2, 11)": { E: 1, W: 0, N: 1, S: 1 },
    "(3, 11)": { E: 1, W: 1, N: 1, S: 1 },
    "(4, 11)": { E: 0, W: 0, N: 1, S: 1 },
    "(5, 11)": { E: 0, W: 0, N: 1, S: 1 },
    "(6, 11)": { E: 0, W: 0, N: 1, S: 0 },
    "(7, 11)": { E: 0, W: 1, N: 0, S: 1 },
    "(8, 11)": { E: 1, W: 0, N: 1, S: 0 },
    "(9, 11)": { E: 0, W: 0, N: 0, S: 1 },
    "(10, 11)": { E: 1, W: 1, N: 1, S: 0 },
    "(1, 12)": { E: 1, W: 1, N: 0, S: 0 },
    "(2, 12)": { E: 1, W: 1, N: 0, S: 0 },
    "(3, 12)": { E: 0, W: 1, N: 0, S: 0 },
    "(4, 12)": { E: 1, W: 0, N: 0, S: 1 },
    "(5, 12)": { E: 0, W: 0, N: 1, S: 1 },
    "(6, 12)": { E: 0, W: 0, N: 1, S: 1 },
    "(7, 12)": { E: 1, W: 0, N: 1, S: 0 },
    "(8, 12)": { E: 0, W: 1, N: 0, S: 1 },
    "(9, 12)": { E: 1, W: 0, N: 1, S: 0 },
    "(10, 12)": { E: 1, W: 1, N: 0, S: 0 },
    "(1, 13)": { E: 1, W: 1, N: 0, S: 0 },
    "(2, 13)": { E: 1, W: 1, N: 0, S: 1 },
    "(3, 13)": { E: 0, W: 0, N: 1, S: 1 },
    "(4, 13)": { E: 1, W: 1, N: 1, S: 0 },
    "(5, 13)": { E: 0, W: 0, N: 0, S: 1 },
    "(6, 13)": { E: 0, W: 0, N: 1, S: 1 },
    "(7, 13)": { E: 0, W: 1, N: 1, S: 1 },
    "(8, 13)": { E: 0, W: 0, N: 1, S: 1 },
    "(9, 13)": { E: 0, W: 1, N: 1, S: 0 },
    "(10, 13)": { E: 0, W: 1, N: 0, S: 0 },
    "(1, 14)": { E: 1, W: 1, N: 0, S: 1 },
    "(2, 14)": { E: 0, W: 1, N: 1, S: 1 },
    "(3, 14)": { E: 1, W: 0, N: 1, S: 1 },
    "(4, 14)": { E: 1, W: 1, N: 1, S: 0 },
    "(5, 14)": { E: 1, W: 0, N: 0, S: 1 },
    "(6, 14)": { E: 0, W: 0, N: 1, S: 1 },
    "(7, 14)": { E: 0, W: 0, N: 1, S: 1 },
    "(8, 14)": { E: 0, W: 0, N: 1, S: 1 },
    "(9, 14)": { E: 0, W: 0, N: 1, S: 1 },
    "(10, 14)": { E: 1, W: 0, N: 1, S: 0 },
    "(1, 15)": { E: 0, W: 1, N: 0, S: 1 },
    "(2, 15)": { E: 0, W: 0, N: 1, S: 1 },
    "(3, 15)": { E: 0, W: 1, N: 1, S: 0 },
    "(4, 15)": { E: 0, W: 1, N: 0, S: 1 },
    "(5, 15)": { E: 0, W: 1, N: 1, S: 1 },
    "(6, 15)": { E: 0, W: 0, N: 1, S: 1 },
    "(7, 15)": { E: 0, W: 0, N: 1, S: 1 },
    "(8, 15)": { E: 0, W: 0, N: 1, S: 1 },
    "(9, 15)": { E: 0, W: 0, N: 1, S: 1 },
    "(10, 15)": { E: 0, W: 1, N: 1, S: 0 },
  };

  // Nodes with heuristic values
  const nodesWithHeuristics = [
    "(1, 1)",
    "(2, 1)",
    "(3, 1)",
    "(4, 1)",
    "(7, 1)",
    "(10, 1)",
    "(2, 2)",
    "(3, 2)",
    "(4, 2)",
    "(5, 2)",
    "(7, 2)",
    "(8, 2)",
    "(10, 2)",
    "(2, 3)",
    "(3, 3)",
    "(6, 3)",
    "(7, 3)",
    "(8, 3)",
    "(9, 3)",
    "(10, 3)",
    "(1, 4)",
    "(2, 4)",
    "(6, 4)",
    "(7, 4)",
    "(10, 4)",
    "(2, 5)",
    "(3, 5)",
    "(5, 5)",
    "(8, 5)",
    "(9, 5)",
    "(10, 5)",
    "(1, 6)",
    "(2, 6)",
    "(3, 6)",
    "(5, 6)",
    "(6, 6)",
    "(8, 6)",
    "(9, 6)",
    "(10, 6)",
    "(2, 7)",
    "(3, 7)",
    "(4, 7)",
    "(5, 7)",
    "(6, 7)",
    "(7, 7)",
    "(9, 7)",
    "(1, 8)",
    "(2, 8)",
    "(3, 8)",
    "(4, 8)",
    "(5, 8)",
    "(7, 8)",
    "(8, 8)",
    "(10, 8)",
    "(1, 9)",
    "(2, 9)",
    "(3, 9)",
    "(5, 9)",
    "(6, 9)",
    "(7, 9)",
    "(8, 9)",
    "(9, 9)",
    "(10, 9)",
    "(1, 10)",
    "(3, 10)",
    "(4, 10)",
    "(6, 10)",
    "(8, 10)",
    "(10, 10)",
    "(1, 11)",
    "(2, 11)",
    "(3, 11)",
    "(6, 11)",
    "(7, 11)",
    "(8, 11)",
    "(9, 11)",
    "(10, 11)",
    "(3, 12)",
    "(4, 12)",
    "(7, 12)",
    "(8, 12)",
    "(9, 12)",
    "(2, 13)",
    "(4, 13)",
    "(5, 13)",
    "(7, 13)",
    "(9, 13)",
    "(10, 13)",
    "(1, 14)",
    "(2, 14)",
    "(3, 14)",
    "(4, 14)",
    "(5, 14)",
    "(10, 14)",
    "(1, 15)",
    "(3, 15)",
    "(4, 15)",
    "(5, 15)",
    "(10, 15)",
  ];

  // Edges between nodes (undirected graph)
  const edges = [
    ["(1, 1)", "(1, 4)"],
    ["(1, 1)", "(2, 1)"],
    ["(2, 1)", "(2, 2)"],
    ["(2, 2)", "(3, 2)"],
    ["(3, 2)", "(3, 1)"],
    ["(1, 4)", "(2, 4)"],
    ["(2, 4)", "(2, 3)"],
    ["(2, 3)", "(3, 3)"],
    ["(3, 3)", "(3, 5)"],
    ["(3, 5)", "(2, 5)"],
    ["(2, 5)", "(2, 6)"],
    ["(2, 6)", "(1, 6)"],
    ["(1, 4)", "(1, 6)"],
    ["(1, 6)", "(1, 8)"],
    ["(1, 8)", "(2, 8)"],
    ["(2, 8)", "(2, 7)"],
    ["(2, 8)", "(2, 9)"],
    ["(2, 9)", "(3, 9)"],
    ["(3, 9)", "(3, 8)"],
    ["(3, 9)", "(3, 10)"],
    ["(3, 10)", "(1, 10)"],
    ["(1, 10)", "(1, 9)"],
    ["(3, 10)", "(3, 11)"],
    ["(3, 11)", "(2, 11)"],
    ["(2, 11)", "(1, 11)"],
    ["(1, 11)", "(1, 14)"],
    ["(2, 11)", "(2, 13)"],
    ["(2, 13)", "(2, 14)"],
    ["(2, 14)", "(1, 14)"],
    ["(3, 11)", "(3, 12)"],
    ["(2, 14)", "(3, 14)"],
    ["(1, 14)", "(1, 15)"],
    ["(1, 15)", "(3, 15)"],
    ["(3, 15)", "(3, 14)"],
    ["(3, 14)", "(4, 14)"],
    ["(4, 14)", "(4, 15)"],
    ["(4, 14)", "(4, 13)"],
    ["(2, 13)", "(4, 13)"],
    ["(4, 13)", "(4, 12)"],
    ["(4, 12)", "(7, 12)"],
    ["(2, 6)", "(3, 6)"],
    ["(3, 6)", "(3, 7)"],
    ["(3, 7)", "(4, 7)"],
    ["(4, 15)", "(5, 15)"],
    ["(4, 1)", "(7, 1)"],
    ["(4, 2)", "(5, 2)"],
    ["(4, 7)", "(5, 7)"],
    ["(4, 8)", "(5, 8)"],
    ["(4, 10)", "(6, 10)"],
    ["(4, 1)", "(4, 2)"],
    ["(4, 2)", "(4, 7)"],
    ["(4, 8)", "(4, 10)"],
    ["(5, 2)", "(5, 5)"],
    ["(5, 7)", "(5, 8)"],
    ["(5, 8)", "(5, 9)"],
    ["(5, 14)", "(5, 15)"],
    ["(5, 2)", "(7, 2)"],
    ["(5, 5)", "(8, 5)"],
    ["(5, 6)", "(6, 6)"],
    ["(5, 7)", "(6, 7)"],
    ["(5, 8)", "(7, 8)"],
    ["(5, 13)", "(7, 13)"],
    ["(5, 14)", "(10, 14)"],
    ["(5, 15)", "(10, 15)"],
    ["(6, 3)", "(7, 3)"],
    ["(6, 4)", "(7, 4)"],
    ["(6, 6)", "(8, 6)"],
    ["(6, 9)", "(7, 9)"],
    ["(7, 1)", "(10, 1)"],
    ["(7, 7)", "(9, 7)"],
    ["(7, 8)", "(8, 8)"],
    ["(7, 9)", "(8, 9)"],
    ["(7, 11)", "(8, 11)"],
    ["(7, 13)", "(9, 13)"],
    ["(8, 2)", "(10, 2)"],
    ["(8, 3)", "(9, 3)"],
    ["(8, 8)", "(10, 8)"],
    ["(8, 10)", "(10, 10)"],
    ["(8, 12)", "(9, 12)"],
    ["(9, 3)", "(10, 3)"],
    ["(9, 5)", "(10, 5)"],
    ["(9, 6)", "(10, 6)"],
    ["(9, 9)", "(10, 9)"],
    ["(9, 11)", "(10, 11)"],
    ["(6, 3)", "(6, 4)"],
    ["(6, 6)", "(6, 7)"],
    ["(6, 9)", "(6, 10)"],
    ["(7, 1)", "(7, 2)"],
    ["(7, 2)", "(7, 3)"],
    ["(7, 7)", "(7, 8)"],
    ["(7, 9)", "(7, 11)"],
    ["(7, 12)", "(7, 13)"],
    ["(3, 11)", "(6, 11)"],
    ["(8, 3)", "(8, 5)"],
    ["(8, 8)", "(8, 9)"],
    ["(8, 9)", "(8, 10)"],
    ["(8, 11)", "(8, 12)"],
    ["(9, 3)", "(9, 5)"],
    ["(9, 6)", "(9, 7)"],
    ["(9, 12)", "(9, 13)"],
    ["(10, 1)", "(10, 2)"],
    ["(10, 3)", "(10, 4)"],
    ["(10, 5)", "(10, 6)"],
    ["(10, 6)", "(10, 8)"],
    ["(10, 9)", "(10, 10)"],
    ["(10, 10)", "(10, 11)"],
    ["(10, 11)", "(10, 13)"],
    ["(10, 14)", "(10, 15)"],
  ];

  // Weight of each edge (randomly generated for demonstration)
  const edgeWeights = {
    "(1, 1)-(1, 4)": 3,
    "(1, 1)-(2, 1)": 1,
    "(2, 1)-(2, 2)": 1,
    "(2, 2)-(3, 2)": 1,
    "(3, 2)-(3, 1)": 1,
    "(1, 4)-(2, 4)": 1,
    "(2, 4)-(2, 3)": 1,
    "(2, 3)-(3, 3)": 1,
    "(3, 3)-(3, 5)": 2,
    "(3, 5)-(2, 5)": 1,
    "(2, 5)-(2, 6)": 1,
    "(2, 6)-(1, 6)": 1,
    "(1, 4)-(1, 6)": 2,
    "(1, 6)-(1, 8)": 2,
    "(1, 8)-(2, 8)": 1,
    "(2, 8)-(2, 7)": 1,
    "(2, 8)-(2, 9)": 1,
    "(2, 9)-(3, 9)": 1,
    "(3, 9)-(3, 8)": 1,
    "(3, 9)-(3, 10)": 1,
    "(3, 10)-(1, 10)": 2,
    "(1, 10)-(1, 9)": 1,
    "(3, 10)-(3, 11)": 1,
    "(3, 11)-(2, 11)": 1,
    "(2, 11)-(1, 11)": 1,
    "(1, 11)-(1, 14)": 3,
    "(2, 11)-(2, 13)": 2,
    "(2, 13)-(2, 14)": 1,
    "(2, 14)-(1, 14)": 1,
    "(3, 11)-(3, 12)": 1,
    "(2, 14)-(3, 14)": 1,
    "(1, 14)-(1, 15)": 1,
    "(1, 15)-(3, 15)": 2,
    "(3, 15)-(3, 14)": 1,
    "(3, 14)-(4, 14)": 1,
    "(4, 14)-(4, 15)": 1,
    "(4, 14)-(4, 13)": 1,
    "(2, 13)-(4, 13)": 2,
    "(4, 13)-(4, 12)": 1,
    "(4, 12)-(7, 12)": 3,
    "(2, 6)-(3, 6)": 1,
    "(3, 6)-(3, 7)": 1,
    "(3, 7)-(4, 7)": 1,
    "(4, 15)-(5, 15)": 1,
    "(4, 1)-(7, 1)": 3,
    "(4, 2)-(5, 2)": 1,
    "(4, 7)-(5, 7)": 1,
    "(4, 8)-(5, 8)": 1,
    "(4, 10)-(6, 10)": 2,
    "(4, 1)-(4, 2)": 1,
    "(4, 2)-(4, 7)": 5,
    "(4, 8)-(4, 10)": 2,
    "(5, 2)-(5, 5)": 3,
    "(5, 7)-(5, 8)": 1,
    "(5, 8)-(5, 9)": 1,
    "(5, 14)-(5, 15)": 1,
    "(5, 2)-(7, 2)": 2,
    "(5, 5)-(8, 5)": 3,
    "(5, 6)-(6, 6)": 1,
    "(5, 7)-(6, 7)": 1,
    "(5, 8)-(7, 8)": 2,
    "(5, 13)-(7, 13)": 2,
    "(5, 14)-(10, 14)": 5,
    "(5, 15)-(10, 15)": 5,
    "(6, 3)-(7, 3)": 1,
    "(6, 4)-(7, 4)": 1,
    "(6, 6)-(8, 6)": 2,
    "(6, 9)-(7, 9)": 1,
    "(7, 1)-(10, 1)": 3,
    "(7, 7)-(9, 7)": 2,
    "(7, 8)-(8, 8)": 1,
    "(7, 9)-(8, 9)": 1,
    "(7, 11)-(8, 11)": 1,
    "(7, 13)-(9, 13)": 2,
    "(8, 2)-(10, 2)": 2,
    "(8, 3)-(9, 3)": 1,
    "(8, 8)-(10, 8)": 2,
    "(8, 10)-(10, 10)": 2,
    "(8, 12)-(9, 12)": 1,
    "(9, 3)-(10, 3)": 1,
    "(9, 5)-(10, 5)": 1,
    "(9, 6)-(10, 6)": 1,
    "(9, 9)-(10, 9)": 1,
    "(9, 11)-(10, 11)": 1,
    "(6, 3)-(6, 4)": 1,
    "(6, 6)-(6, 7)": 1,
    "(6, 9)-(6, 10)": 1,
    "(7, 1)-(7, 2)": 1,
    "(7, 2)-(7, 3)": 1,
    "(7, 7)-(7, 8)": 1,
    "(7, 9)-(7, 11)": 2,
    "(7, 12)-(7, 13)": 1,
    "(3, 11)-(6, 11)": 3,
    "(8, 3)-(8, 5)": 2,
    "(8, 8)-(8, 9)": 1,
    "(8, 9)-(8, 10)": 1,
    "(8, 11)-(8, 12)": 1,
    "(9, 3)-(9, 5)": 2,
    "(9, 6)-(9, 7)": 1,
    "(9, 12)-(9, 13)": 1,
    "(10, 1)-(10, 2)": 1,
    "(10, 3)-(10, 4)": 1,
    "(10, 5)-(10, 6)": 1,
    "(10, 6)-(10, 8)": 2,
    "(10, 9)-(10, 10)": 1,
    "(10, 10)-(10, 11)": 1,
    "(10, 11)-(10, 13)": 2,
    "(10, 14)-(10, 15)": 1,
  };

  // Calculate Manhattan distance for heuristic
  const calculateManhattanDistance = (pos1, pos2) => {
    const [row1, col1] = pos1.replace(/[()]/g, "").split(", ").map(Number);
    const [row2, col2] = pos2.replace(/[()]/g, "").split(", ").map(Number);
    return Math.abs(row1 - row2) + Math.abs(col1 - col2);
  };

  // Calculate heuristic values for all nodes (Manhattan distance to goal)
  const calculateHeuristics = () => {
    const goal = "(10, 15)";
    const heuristics = {};

    nodesWithHeuristics.forEach((node) => {
      heuristics[node] = calculateManhattanDistance(node, goal);
    });

    return heuristics;
  };

  // Get weight between two nodes
  const getEdgeWeight = (node1, node2) => {
    const key1 = `${node1}-${node2}`;
    const key2 = `${node2}-${node1}`;
    return edgeWeights[key1] || edgeWeights[key2] || Infinity;
  };

  // Get neighbors of a node based on the graph edges
  const getNeighbors = (node) => {
    const neighbors = [];

    edges.forEach(([a, b]) => {
      if (a === node) neighbors.push(b);
      if (b === node) neighbors.push(a);
    });

    return neighbors;
  };

  // A* search algorithm implementation
  const aStarSearch = () => {
    const start = "(1, 1)";
    const goal = "(10, 15)";
    const heuristics = calculateHeuristics();

    // Initialize data structures
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
        evaluation: `Selected ${current}: f(n) = ${fScore[current].toFixed(
          1
        )} = g(n): ${gScore[current].toFixed(1)} + h(n): ${
          heuristics[current]
        }`,
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
        const tentativeGScore =
          gScore[current] + getEdgeWeight(current, neighbor);

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

  // Reconstruct path from start to current based on cameFrom map
  const reconstructPath = (cameFrom, current) => {
    const totalPath = [current];
    while (cameFrom[current]) {
      current = cameFrom[current];
      totalPath.unshift(current);
    }
    return totalPath;
  };

  // State for the simulation
  const [searchResult, setSearchResult] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSearchStarted, setIsSearchStarted] = useState(false);

  // Start the search
  const startSearch = () => {
    const result = aStarSearch();
    setSearchResult(result);
    setCurrentStepIndex(0);
    setIsSearchStarted(true);
  };

  // Move to next step
  const nextStep = () => {
    if (currentStepIndex < searchResult.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  // Move to previous step
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Current step data
  const currentStep =
    isSearchStarted && searchResult
      ? searchResult.steps[currentStepIndex]
      : null;

  // Calculated heuristics
  const heuristics = calculateHeuristics();

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Mazing Game using A*</h1>

      {!isSearchStarted ? (
        <button
          onClick={startSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
        >
          Start A* Search
        </button>
      ) : (
        <div className="flex gap-2 mb-4">
          <button
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            className={`px-4 py-2 rounded ${
              currentStepIndex === 0 ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Previous Step
          </button>
          <button
            onClick={nextStep}
            disabled={currentStepIndex === searchResult.steps.length - 1}
            className={`px-4 py-2 rounded ${
              currentStepIndex === searchResult.steps.length - 1
                ? "bg-gray-300"
                : "bg-blue-500 text-white"
            }`}
          >
            Next Step
          </button>
          <span className="px-4 py-2">
            Step {currentStepIndex + 1} of {searchResult.steps.length}
          </span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Maze Visualization - Updated for 10x15 grid */}
        <div className="border rounded p-4 overflow-auto">
          <h2 className="text-lg font-semibold mb-2">Maze Visualization</h2>
          <div className="relative">
            <svg width="1200" height="800" viewBox="0 0 750 500">
              {/* Draw grid - Updated for 10x15 */}
              {Array.from({ length: 10 }).map((_, row) =>
                Array.from({ length: 15 }).map((_, col) => {
                  const cellKey = `(${row + 1}, ${col + 1})`;
                  const cell = mazeData[cellKey];
                  const x = col * 50;
                  const y = row * 50;
                  return (
                    <g key={cellKey}>
                      {/* Draw walls */}
                      {cell && cell.N === 0 && (
                        <line
                          x1={x}
                          y1={y}
                          x2={x + 50}
                          y2={y}
                          stroke="black"
                          strokeWidth="2"
                        />
                      )}
                      {cell && cell.S === 0 && (
                        <line
                          x1={x}
                          y1={y + 50}
                          x2={x + 50}
                          y2={y + 50}
                          stroke="black"
                          strokeWidth="2"
                        />
                      )}
                      {cell && cell.E === 0 && (
                        <line
                          x1={x + 50}
                          y1={y}
                          x2={x + 50}
                          y2={y + 50}
                          stroke="black"
                          strokeWidth="2"
                        />
                      )}
                      {cell && cell.W === 0 && (
                        <line
                          x1={x}
                          y1={y}
                          x2={x}
                          y2={y + 50}
                          stroke="black"
                          strokeWidth="2"
                        />
                      )}

                      {/* Draw cell */}
                      <rect
                        x={x + 5}
                        y={y + 5}
                        width={40}
                        height={40}
                        fill="white"
                        stroke="none"
                      />
                    </g>
                  );
                })
              )}

              {/* Draw nodes with heuristic values */}
              {nodesWithHeuristics.map((node) => {
                const [row, col] = node
                  .replace(/[()]/g, "")
                  .split(", ")
                  .map(Number);
                const x = (col - 1) * 50 + 25;
                const y = (row - 1) * 50 + 25;

                return (
                  <g key={`node-${node}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r={12}
                      strokeDasharray="3,3"
                      stroke="black"
                      strokeWidth="1"
                      fill={
                        node === "(1, 1)"
                          ? "lightgreen"
                          : node === "(10, 15)"
                          ? "lightcoral"
                          : currentStep && currentStep.current === node
                          ? "yellow"
                          : currentStep && currentStep.path.includes(node)
                          ? "lightblue"
                          : currentStep && currentStep.openSet.includes(node)
                          ? "lightgray"
                          : "white"
                      }
                    />
                    <text x={x} y={y + 3} textAnchor="middle" fontSize="8">
                      {heuristics[node]}
                    </text>
                    <text x={x} y={y - 15} textAnchor="middle" fontSize="8">
                      {node}
                    </text>
                  </g>
                );
              })}

              {/* Draw edges between nodes - with optimized display for larger grid */}
              {edges.map(([node1, node2], index) => {
                const [row1, col1] = node1
                  .replace(/[()]/g, "")
                  .split(", ")
                  .map(Number);
                const [row2, col2] = node2
                  .replace(/[()]/g, "")
                  .split(", ")
                  .map(Number);

                const x1 = (col1 - 1) * 50 + 25;
                const y1 = (row1 - 1) * 50 + 25;
                const x2 = (col2 - 1) * 50 + 25;
                const y2 = (row2 - 1) * 50 + 25;

                const edgeKey1 = `${node1}-${node2}`;
                const edgeKey2 = `${node2}-${node1}`;
                const weight = edgeWeights[edgeKey1] || edgeWeights[edgeKey2];

                // Calculate midpoint for weight label
                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;

                // Check if this edge is part of the current path
                const isInPath =
                  currentStep &&
                  currentStep.path.some(
                    (node, i) =>
                      i < currentStep.path.length - 1 &&
                      ((currentStep.path[i] === node1 &&
                        currentStep.path[i + 1] === node2) ||
                        (currentStep.path[i] === node2 &&
                          currentStep.path[i + 1] === node1))
                  );

                return (
                  <g key={`edge-${index}`}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isInPath ? "blue" : "gray"}
                      strokeWidth={isInPath ? "3" : "1"}
                    />
                    <circle
                      cx={midX}
                      cy={midY}
                      r={6}
                      fill="white"
                      stroke="gray"
                    />
                    <text
                      x={midX}
                      y={midY + 2}
                      textAnchor="middle"
                      fontSize="7"
                    >
                      {weight}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-1">Legend:</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lightgreen"></div>
                <span>Start Node (1,1)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-lightcoral"></div>
                <span>Goal Node (5,5)</span>
              </div>
              {isSearchStarted && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow"></div>
                    <span>Current Node</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-lightblue"></div>
                    <span>Path Nodes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-lightgray"></div>
                    <span>Open Set</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* A* Algorithm Details */}
        {isSearchStarted && currentStep && (
          <div className="border rounded p-4 max-w-md">
            <h2 className="text-lg font-semibold mb-2">A* Algorithm Details</h2>

            <div className="mb-4">
              <h3 className="font-medium">Current Node Evaluation:</h3>
              <p className="text-sm">{currentStep.evaluation}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-medium">Open Set:</h3>
              {currentStep.openSet.length > 0 ? (
                <ul className="text-sm">
                  {currentStep.openSet
                    .map((node) => ({
                      node,
                      fScore: currentStep.fScore[node],
                    }))
                    .sort((a, b) => a.fScore - b.fScore)
                    .map((item, i) => (
                      <li key={i} className={i === 0 ? "font-medium" : ""}>
                        {item.node}: f(n) = {item.fScore.toFixed(1)}
                        {i === 0 &&
                          currentStep.current !== item.node &&
                          " (lowest f-score)"}
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-sm">Empty</p>
              )}
            </div>

            <div className="mb-4">
              <h3 className="font-medium">Current Path:</h3>
              <p className="text-sm">
                {currentStep.path.join(" → ") || "None"}
              </p>
            </div>

            {currentStep.neighbors.length > 0 && (
              <div>
                <h3 className="font-medium">Neighbor Evaluations:</h3>
                <ul className="text-sm">
                  {currentStep.neighborEvaluations.map((evaluation, i) => (
                    <li key={i} className="mb-1">
                      <span className="font-medium">{evaluation.neighbor}</span>
                      :
                      {evaluation.better ? (
                        <span>
                          New path is better! g(n):{" "}
                          {evaluation.tentativeGScore.toFixed(1)} {"<"}{" "}
                          {evaluation.currentGScore === Infinity
                            ? "∞"
                            : evaluation.currentGScore.toFixed(1)}
                        </span>
                      ) : (
                        <span>
                          Current path is better or equal. g(n):{" "}
                          {evaluation.tentativeGScore.toFixed(1)} {"≥"}{" "}
                          {evaluation.currentGScore === Infinity
                            ? "∞"
                            : evaluation.currentGScore.toFixed(1)}
                        </span>
                      )}
                      {evaluation.newFScore != null && (
                        <span>
                          {" "}
                          → New f(n): {evaluation.newFScore.toFixed(1)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {currentStepIndex === searchResult.steps.length - 1 && (
              <div className="mt-4 p-2 bg-green-100 border border-green-400 rounded">
                <h3 className="font-medium">Result:</h3>
                {searchResult.success ? (
                  <p>Path found! Length: {searchResult.path.length} nodes</p>
                ) : (
                  <p>No path found to goal.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MazePathfinder;
