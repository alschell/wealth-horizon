
import React from "react";
import { AlertTriangle, Check } from "lucide-react";
import { OrderType } from "../../types";

interface WarningsNoticesProps {
  warnings: string[];
}

const WarningsNotices: React.FC<WarningsNoticesProps> = ({ warnings }) => {
  return (
    <>
      {/* Warnings and notices */}
      {warnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-6">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800 mb-1">Please note:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-amber-700">{warning}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation box */}
      <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-2">
        <div className="flex items-start">
          <Check className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-green-800">Ready to submit</h4>
            <p className="text-sm text-green-700 mt-1">
              By clicking "Submit Order", you agree to the terms and conditions of this transaction.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WarningsNotices;
