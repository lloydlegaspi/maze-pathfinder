import cheeseIcon from '../images/cheese.png'; 
import mouseIcon from '../images/mouse1.png';   

const Legend = ({ isSearchStarted }) => {
  // Array of legend items
  const legendItems = [
    { 
      type: "icon", 
      icon: "start", 
      label: "Start Node (1,1)",
      color: "bg-lightgreen" // Keeping color as fallback
    },
    { 
      type: "image", 
      src: cheeseIcon, 
      alt: "Cheese icon",
      label: "Goal Node (10,15)" 
    },
  ];

  // Add additional items if search has started
  const searchItems = isSearchStarted ? [
    { 
      type: "image", 
      src: mouseIcon,
      alt: "Mouse icon", 
      label: "Current Node" 
    },
    { 
      type: "icon", 
      color: "bg-lightblue", 
      label: "Path Nodes" 
    },
    { 
      type: "icon", 
      color: "bg-lightgray", 
      label: "Open Set" 
    },
  ] : [];

  const allItems = [...legendItems, ...searchItems];
  
  const leftColumnItems = allItems.filter((_, index) => index % 2 === 0);
  const rightColumnItems = allItems.filter((_, index) => index % 2 === 1);

  // Helper function to render the appropriate icon type
  const renderIcon = (item) => {
    if (item.type === "image") {
      return <img src={item.src} alt={item.alt} className="w-4 h-4" />;
    } else {
      return <div className={`w-4 h-4 ${item.color}`}></div>;
    }
  };

  return (
    <div>
      <h3 className="font-medium mb-2 text-left">Legend:</h3>
      <div className="flex w-full gap-8">
        <div className="flex-1">
          {leftColumnItems.map((item, index) => (
            <div key={`left-${index}`} className="flex items-center gap-2 mb-2">
              {renderIcon(item)}
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex-1">
          {rightColumnItems.map((item, index) => (
            <div key={`right-${index}`} className="flex items-center gap-2 mb-2">
              {renderIcon(item)}
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Legend;