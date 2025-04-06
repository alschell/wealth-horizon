
import React from "react";
import { useNavigate } from "react-router-dom";

const TopAssets = () => {
  const navigate = useNavigate();
  
  const topAssets = [
    {
      id: "us-tech-fund",
      name: "US Tech Fund",
      value: "$1.24B",
      change: "+4.7%",
      isPositive: true
    },
    {
      id: "treasury-notes",
      name: "Treasury Notes",
      value: "$845M",
      change: "+1.2%",
      isPositive: true
    },
    {
      id: "real-estate",
      name: "Real Estate Holdings",
      value: "$682M",
      change: "-2.1%",
      isPositive: false
    },
    {
      id: "private-equity",
      name: "Private Equity",
      value: "$456M",
      change: "+8.3%",
      isPositive: true
    }
  ];
  
  const handleAssetClick = (assetId: string) => {
    navigate(`/analyze-wealth/asset/${assetId}`);
  };

  return (
    <div className="space-y-3">
      {topAssets.map((asset) => (
        <div 
          key={asset.id}
          className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => handleAssetClick(asset.id)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-sm font-semibold">{asset.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{asset.value}</p>
            </div>
            <span className={`text-sm font-medium ${asset.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {asset.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopAssets;
