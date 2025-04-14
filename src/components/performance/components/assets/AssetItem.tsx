
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

type AssetItemProps = {
  asset: {
    name: string;
    value: string;
    change: string;
    isPositive: boolean;
  };
};

const AssetItem = ({ asset }: AssetItemProps) => {
  return (
    <div className="p-3 rounded-md border border-gray-100 hover:shadow-sm transition-shadow bg-white">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">{asset.name}</p>
        <p className="text-sm font-bold">{asset.value}</p>
      </div>
      <div className="flex justify-end mt-1">
        <span className={`text-xs flex items-center ${asset.isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
          {asset.isPositive ? 
            <ArrowUp className="h-3 w-3 mr-0.5" /> : 
            <ArrowDown className="h-3 w-3 mr-0.5" />
          }
          {asset.change}
        </span>
      </div>
    </div>
  );
};

export default AssetItem;
