
import React from "react";

type AssetAllocationItemProps = {
  item: {
    name: string;
    value: number;
  };
  colorIndex: number;
};

const AssetAllocationItem = ({ item, colorIndex }: AssetAllocationItemProps) => {
  const getColor = (index: number) => {
    return index === 0 ? '#000' : 
           index === 1 ? '#777' : 
           index === 2 ? '#aaa' : 
           index === 3 ? '#555' : '#ccc';
  };

  return (
    <div className="mb-2">
      <div className="flex items-center">
        <div 
          className="h-3 w-3 rounded-sm mr-2" 
          style={{ backgroundColor: getColor(colorIndex) }} 
        />
        <span className="text-xs">{item.name}</span>
      </div>
      <p className="text-sm font-medium ml-5">{item.value}%</p>
    </div>
  );
};

export default AssetAllocationItem;
