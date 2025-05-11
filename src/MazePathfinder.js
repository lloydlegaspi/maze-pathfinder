import React, { useState } from "react";
import MazeVisualizer from "./components/MazeVisualizer";
import Legend from "./components/Legend";
import ControlPanel from "./components/ControlPanel";
import AlgorithmDetails from "./components/AlgorithmDetails";
import { aStarSearch } from "./utils/aStarAlgorithm";
import { uniformCostSearch } from "./utils/uniformCostSearch";
import { greedyBestFirstSearch } from "./utils/greedyBestFirstSearch";

const MazePathfinder = () => {
  // State for the simulation
  const [searchResult, setSearchResult] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSearchStarted, setIsSearchStarted] = useState(false);
  const [algorithm, setAlgorithm] = useState("astar"); // default to A*

  // Start the search
  const startSearch = () => {
    let result;
    switch (algorithm) {
      case "ucs":
        result = uniformCostSearch();
        break;
      case "greedy":
        result = greedyBestFirstSearch();
        break;
      case "astar":
      default:
        result = aStarSearch();
    }
    setSearchResult(result);
    setCurrentStepIndex(0);
    setIsSearchStarted(true);
  };

  // Change algorithm
  const changeAlgorithm = (algo) => {
    if (algo === algorithm) return; // Don't do anything if selecting the same algorithm
    
    setAlgorithm(algo);
    
    // If a search has already been started, automatically start a new search
    // with the newly selected algorithm
    if (isSearchStarted) {
      // Using setTimeout to ensure state update happens before the search starts
      setTimeout(() => {
        let result;
        switch (algo) {
          case "ucs":
            result = uniformCostSearch();
            break;
          case "greedy":
            result = greedyBestFirstSearch();
            break;
          case "astar":
          default:
            result = aStarSearch();
        }
        setSearchResult(result);
        setCurrentStepIndex(0);
      }, 0);
    } else {
      // If no search is started yet, just update the algorithm
      setSearchResult(null);
      setCurrentStepIndex(0);
    }
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

  // Reset to first step
  const resetSearch = () => {
    setCurrentStepIndex(0);
  };

  // Fast forward to last step
  const fastForward = () => {
    if (searchResult && searchResult.steps.length > 0) {
      setCurrentStepIndex(searchResult.steps.length - 1);
    }
  };

  // Get algorithm display name
  const getAlgorithmName = () => {
    switch (algorithm) {
      case "ucs": return "Uniform Cost Search";
      case "greedy": return "Greedy Best-First Search";
      case "astar": default: return "A* Search";
    }
  };

  // Current step data
  const currentStep =
    isSearchStarted && searchResult
      ? searchResult.steps[currentStepIndex]
      : null;

  const isLastStep =
    isSearchStarted &&
    searchResult &&
    currentStepIndex === searchResult.steps.length - 1;

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col items-center p-2">
        <h1 className="text-2xl font-bold mb-4">
          Maze Pathfinder using {getAlgorithmName()}
        </h1>

        <div className="flex flex-row gap-8 items-start">
          {/* Left Column: Maze + Legend */}
          <div className="flex flex-col">
            {/* Maze Visualization */}
            <MazeVisualizer currentStep={currentStep} />

            {/* Legend Container - Below Maze */}
            <div className="mt-4 border rounded p-4">
              {/* Legend */}
              <Legend isSearchStarted={isSearchStarted} />
            </div>
          </div>

          {/* Right Column: Controls + Algorithm Details */}
          <div className="flex flex-col gap-4">
            {/* Algorithm Selector */}
            <div className="border rounded p-4 flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => changeAlgorithm("astar")}
                  className={`px-4 py-2 rounded ${
                    algorithm === "astar"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                  title="f(n) = g(n) + h(n)"
                >
                  A* Search
                </button>
                <button
                  onClick={() => changeAlgorithm("ucs")}
                  className={`px-4 py-2 rounded ${
                    algorithm === "ucs"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                  title="f(n) = g(n)"
                >
                  Uniform Cost
                </button>
                <button
                  onClick={() => changeAlgorithm("greedy")}
                  className={`px-4 py-2 rounded ${
                    algorithm === "greedy"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  }`}
                  title="f(n) = h(n)"
                >
                  Greedy Best-First
                </button>
              </div>
            </div>
            
            {/* Controls Panel */}
            <div className="border rounded p-4 justify-center items-center w-full">
              <ControlPanel
                isSearchStarted={isSearchStarted}
                startSearch={startSearch}
                prevStep={prevStep}
                nextStep={nextStep}
                resetSearch={resetSearch}
                fastForward={fastForward}
                currentStepIndex={currentStepIndex}
                totalSteps={searchResult?.steps.length || 0}
                algorithmName={getAlgorithmName()}
              />
            </div>

            {/* Algorithm Details */}
            {isSearchStarted && currentStep && (
              <AlgorithmDetails
                currentStep={currentStep}
                isLastStep={isLastStep}
                searchResult={searchResult}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MazePathfinder;