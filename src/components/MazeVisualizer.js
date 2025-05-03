import React from 'react';
import { mazeData, nodesWithHeuristics, edges, edgeWeights } from '../utils/mazeData';
import {calculateHeuristics  } from '../utils/aStarAlgorithm';

const MazeVisualizer = ({ currentStep }) => {
  const heuristics = calculateHeuristics();
  
  return (
    <div className="border rounded p-4">
      <div className="relative">
        <svg width="750" height="500" viewBox="0 0 750 500">
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 15 }).map((_, col) => {
              const cellKey = `(${row + 1}, ${col + 1})`;
              const cell = mazeData[cellKey];
              const x = col * 50;
              const y = row * 50;
              return (
                <g key={cellKey}>
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

            // Check if edge is part of the current path
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
    </div>
  );
};

export default MazeVisualizer;