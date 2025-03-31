
import React, { memo } from "react";
import { Info } from "lucide-react";

interface LeverageWarningProps {
  leverage: number;
}

const LeverageWarning: React.FC<LeverageWarningProps> = memo(({ leverage }) => {
  // Calculate margin percentage
  const marginRequirement = Math.round(100/leverage);
  
  return (
    <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mt-6">
      <div className="flex">
        <Info className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-amber-800">Margin Requirement</h4>
          <p className="text-sm text-amber-700 mt-1">
            Trading with {leverage}x leverage requires a minimum margin of {marginRequirement}% of the position value.
            Higher leverage increases the risk of liquidation if the market moves against your position.
          </p>
        </div>
      </div>
    </div>
  );
});

LeverageWarning.displayName = 'LeverageWarning';

export default LeverageWarning;
