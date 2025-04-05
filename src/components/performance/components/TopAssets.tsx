
import React from "react";
import { DollarSign } from "lucide-react";

const TopAssets = () => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium flex items-center">
        <DollarSign className="h-4 w-4 mr-1 text-gray-500" /> Top Assets
      </h3>
      <div className="space-y-2">
        <div className="p-2 rounded-md border border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-xs font-medium">AAPL</span>
            </div>
            <div>
              <p className="text-sm font-medium">Apple Inc.</p>
              <p className="text-xs text-gray-500">Technology</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">$420M</p>
            <p className="text-xs text-emerald-600">+2.3%</p>
          </div>
        </div>
        <div className="p-2 rounded-md border border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-xs font-medium">MSFT</span>
            </div>
            <div>
              <p className="text-sm font-medium">Microsoft Corp.</p>
              <p className="text-xs text-gray-500">Technology</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">$380M</p>
            <p className="text-xs text-emerald-600">+1.8%</p>
          </div>
        </div>
        <div className="p-2 rounded-md border border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-xs font-medium">AMZN</span>
            </div>
            <div>
              <p className="text-sm font-medium">Amazon.com Inc.</p>
              <p className="text-xs text-gray-500">Consumer</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">$325M</p>
            <p className="text-xs text-red-500">-0.7%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopAssets;
