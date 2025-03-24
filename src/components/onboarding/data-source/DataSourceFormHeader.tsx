
import React from "react";
import { BarChart4 } from "lucide-react";

const DataSourceFormHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <BarChart4 className="h-7 w-7 text-black" />
        <h2 className="text-2xl font-bold text-black">Financial Data Source</h2>
      </div>
      <p className="text-gray-500">
        Please tell us how you'd like to provide your financial information.
      </p>
    </div>
  );
};

export default DataSourceFormHeader;
