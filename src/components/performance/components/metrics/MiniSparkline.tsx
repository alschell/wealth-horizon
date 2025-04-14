
import React from "react";

type MiniSparklineProps = {
  trend: 'up' | 'down' | 'neutral';
};

const MiniSparkline = ({ trend }: MiniSparklineProps) => {
  return (
    <div className="flex items-end h-4 space-x-[2px] mt-1">
      {trend === 'up' && (
        <>
          <div className="w-[3px] h-1 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-2 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-1 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-3 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-4 bg-emerald-400 rounded-sm"></div>
        </>
      )}
      
      {trend === 'down' && (
        <>
          <div className="w-[3px] h-4 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-3 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-2 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-1 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-1 bg-red-400 rounded-sm"></div>
        </>
      )}
      
      {trend === 'neutral' && (
        <>
          <div className="w-[3px] h-2 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-1 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-3 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-2 bg-gray-300 rounded-sm"></div>
          <div className="w-[3px] h-2 bg-gray-400 rounded-sm"></div>
        </>
      )}
    </div>
  );
};

export default MiniSparkline;
