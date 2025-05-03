import React from 'react';

const Legend = ({ isSearchStarted }) => {
  // Array of legend items
  const legendItems = [
    { color: "bg-lightgreen", label: "Start Node (1,1)" },
    { color: "bg-lightcoral", label: "Goal Node (10,15)" },
  ];

  // Add additional items if search has started
  const searchItems = isSearchStarted ? [
    { color: "bg-yellow", label: "Current Node" },
    { color: "bg-lightblue", label: "Path Nodes" },
    { color: "bg-lightgray", label: "Open Set" },
  ] : [];

  const allItems = [...legendItems, ...searchItems];
  
  const leftColumnItems = allItems.filter((_, index) => index % 2 === 0);
  const rightColumnItems = allItems.filter((_, index) => index % 2 === 1);

  return (
    <div>
      <h3 className="font-medium mb-2 text-left">Legend:</h3>
      <div className="flex w-full gap-8">
        <div className="flex-1">
          {leftColumnItems.map((item, index) => (
            <div key={`left-${index}`} className="flex items-center gap-2 mb-2">
              <div className={`w-4 h-4 ${item.color}`}></div>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex-1">
          {rightColumnItems.map((item, index) => (
            <div key={`right-${index}`} className="flex items-center gap-2 mb-2">
              <div className={`w-4 h-4 ${item.color}`}></div>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Legend;