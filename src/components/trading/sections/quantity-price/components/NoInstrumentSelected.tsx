
import React from "react";
import { AlertCircle } from "lucide-react";

const NoInstrumentSelected: React.FC = () => {
  return (
    <div className="text-center p-6 border rounded-md">
      <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
      <p className="font-medium">Please select an instrument first</p>
      <p className="text-sm text-gray-500 mt-1">
        Return to the previous step to select a security
      </p>
    </div>
  );
};

export default NoInstrumentSelected;
