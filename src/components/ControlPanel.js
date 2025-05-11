import React from 'react';

const ControlPanel = ({ 
  isSearchStarted, 
  startSearch, 
  prevStep, 
  nextStep,
  resetSearch,
  fastForward,
  currentStepIndex, 
  totalSteps,
  algorithmName = "A*" 
}) => {
  return (
    <div className="text-center flex flex-col items-center">
      {!isSearchStarted ? (
        <button
          onClick={startSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Start {algorithmName} Search
        </button>
      ) : (
        <div className="text-center">
          <div className="flex gap-2 mb-2">
            <button
              onClick={resetSearch}
              disabled={currentStepIndex === 0}
              className={`px-4 py-2 rounded ${
                currentStepIndex === 0 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
              title="Reset to first step"
            >
              Reset
            </button>
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className={`px-4 py-2 rounded ${
                currentStepIndex === 0 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={currentStepIndex === totalSteps - 1}
              className={`px-4 py-2 rounded ${
                currentStepIndex === totalSteps - 1
                  ? "bg-gray-300"
                  : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
            <button
              onClick={fastForward}
              disabled={currentStepIndex === totalSteps - 1}
              className={`px-4 py-2 rounded ${
                currentStepIndex === totalSteps - 1
                  ? "bg-gray-300"
                  : "bg-blue-500 text-white"
              }`}
              title="Jump to final step"
            >
              End
            </button>
          </div>
          <div>
            Step {currentStepIndex + 1} of {totalSteps} (Nodes Expanded)
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;