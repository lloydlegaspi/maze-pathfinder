import React from "react";

const AlgorithmDetails = ({ currentStep, isLastStep, searchResult }) => {
  if (!currentStep) return null;

  const closedSet = searchResult.steps
    .slice(0, searchResult.steps.indexOf(currentStep))
    .map((step) => step.current)
    .filter((node) => node !== null);

  return (
    <div className="border rounded p-2" style={{ width: "350px" }}>
      <div className="mb-2">
        <h4 className="font-medium">Current Node Evaluation:</h4>
        <p className="text-sm">{currentStep.evaluation}</p>
      </div>

      <div className="flex b-2 gap-8">
        <div className="flex-1">
          <h4 className="font-medium">Open Set:</h4>
          {currentStep.openSet.length > 0 ? (
            <p className="text-sm">
              {currentStep.openSet
                .map((node) => ({
                  node,
                  fScore: currentStep.fScore[node],
                  isCurrent: node === currentStep.current,
                }))
                .sort((a, b) => a.fScore - b.fScore)
                .map((item, i) => (
                  <span
                    key={i}
                    className={
                      item.isCurrent
                        ? "text-blue-600"
                        : i === 0
                        ? "font-medium"
                        : ""
                    }
                  >
                    {item.node}: {item.fScore.toFixed(1)}
                    {item.isCurrent
                      ? " (current)"
                      : i === 0 && !item.isCurrent
                      ? " (lowest)"
                      : ""}
                    {i < currentStep.openSet.length - 1 ? ", " : ""}
                  </span>
                ))}
            </p>
          ) : (
            <p className="text-sm">Empty</p>
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-medium">Closed Set:</h4>
          {closedSet.length > 0 ? (
            <p className="text-sm">
              {closedSet.map((node, i) => (
                <span key={i}>
                  {node}
                  {i < closedSet.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          ) : (
            <p className="text-sm">Empty</p>
          )}
        </div>
      </div>

      <div className="mb-2">
        <h4 className="font-medium">Current Path:</h4>
        <p className="text-sm">{currentStep.path.join(" → ") || "None"}</p>
      </div>

      {currentStep.neighbors.length > 0 && (
        <div>
          <h4 className="font-medium">Neighbor Evaluations:</h4>
          <ul
            className="text-sm"
            style={{ listStyleType: "none", padding: 0, margin: 0 }}
          >
            {currentStep.neighborEvaluations.map((evaluation, i) => (
              <li key={i} className="mb-1">
                <span className="font-medium">{evaluation.neighbor}</span>:{" "}
                {evaluation.skipped ? (
                  <span className="text-gray-500">
                    Skipped (already in closed set)
                  </span>
                ) : evaluation.better ? (
                  <span>
                    g(n): {evaluation.tentativeGScore.toFixed(1)} {"<"}{" "}
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
                {!evaluation.skipped && evaluation.newFScore != null && (
                  <span> → New f(n): {evaluation.newFScore.toFixed(1)}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isLastStep && (
        <div className="mt-4 p-2 bg-green-100 border border-green-400 rounded">
          <h4 className="font-medium">Result:</h4>
          {searchResult.success ? (
            <p>Path found! Length: {searchResult.path.length} nodes</p>
          ) : (
            <p>No path found to goal.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AlgorithmDetails;
