
import React from "react";

interface AdviceHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdviceHeader: React.FC<AdviceHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">New Advice Mandate</h1>
      
      <div className="flex">
        <div className="w-full">
          <div className="flex items-center">
            {["assets", "mandate", "advisor", "review"].map((tab, index, array) => (
              <React.Fragment key={tab}>
                {/* Tab indicator */}
                <div 
                  className="flex-1 relative"
                  onClick={() => {
                    // Only allow clicking on previous tabs
                    const tabOrder = ["assets", "mandate", "advisor", "review"];
                    if (tabOrder.indexOf(tab) < tabOrder.indexOf(activeTab)) {
                      setActiveTab(tab);
                    }
                  }}
                >
                  <div 
                    className={`
                      h-1 absolute top-0 left-0 right-0
                      ${activeTab === tab ? "bg-black" : 
                        index < array.findIndex(t => t === activeTab) ? "bg-gray-400" : "bg-gray-200"}
                    `}
                  />
                  <div className="pt-3">
                    <div className={`
                      text-sm font-medium cursor-pointer
                      ${activeTab === tab ? "text-black" : 
                        index < array.findIndex(t => t === activeTab) ? "text-gray-500" : "text-gray-400"}
                    `}>
                      {tab === "assets" ? "Assets" : 
                       tab === "mandate" ? "Mandate" : 
                       tab === "advisor" ? "Advisor" : "Review"}
                    </div>
                  </div>
                </div>
                
                {/* Add spacer between tabs */}
                {index < array.length - 1 && <div className="w-8" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceHeader;
