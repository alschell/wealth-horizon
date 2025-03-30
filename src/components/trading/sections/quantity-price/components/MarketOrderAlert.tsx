
import React from "react";
import { Info } from "lucide-react";

const MarketOrderAlert: React.FC = () => {
  return (
    <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100 mb-6">
      <div className="flex items-start">
        <Info className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
        <p className="text-sm text-yellow-700">
          Market orders execute immediately at the best available price. The final price may differ from the current market price shown.
        </p>
      </div>
    </div>
  );
};

export default MarketOrderAlert;
