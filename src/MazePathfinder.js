import React, { useState } from "react";
import MazeVisualizer from "./components/MazeVisualizer";
import Legend from "./components/Legend";
import ControlPanel from "./components/ControlPanel";
import AlgorithmDetails from "./components/AlgorithmDetails";
import { aStarSearch } from "./utils/aStarAlgorithm";

const MazePathfinder = () => {
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
        <h1 className="text-2xl font-bold mb-4">Mazing Game using A*</h1>

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
              />
            </div>

            {/* A* Algorithm Details */}
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
