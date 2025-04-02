
import React from "react";

const CorrelationTab = () => {
  return (
    <>
      <div className="text-sm text-gray-600">
        <p className="mb-4">
          This analysis shows how different assets in your portfolio move in relation to each other.
          Lower correlation between assets generally indicates better diversification.
        </p>
      </div>
      
      <div className="aspect-square max-h-[350px] w-full bg-gray-50 border border-gray-200 rounded-md p-4 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Correlation matrix visualization would appear here</p>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-2">Highest Correlations</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span>US Tech Equities — US Large Cap</span>
              <span className="font-medium">0.92</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>European Bonds — US Bonds</span>
              <span className="font-medium">0.85</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Real Estate — Infrastructure</span>
              <span className="font-medium">0.78</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Lowest Correlations</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span>Gold — US Equities</span>
              <span className="font-medium">-0.21</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Commodities — US Bonds</span>
              <span className="font-medium">-0.15</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Japanese Equities — EU Small Cap</span>
              <span className="font-medium">0.12</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CorrelationTab;
