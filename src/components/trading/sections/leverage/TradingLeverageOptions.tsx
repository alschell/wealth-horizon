
import React, { useCallback } from "react";
import LeveragePresets from "./LeveragePresets";
import LeverageSlider from "./LeverageSlider";
import LeverageWarning from "./LeverageWarning";

interface TradingLeverageOptionsProps {
  leverage: number;
  setLeverage: (value: number) => void;
  orderType: string;
}

const TradingLeverageOptions: React.FC<TradingLeverageOptionsProps> = ({
  leverage,
  setLeverage,
  orderType
}) => {
  // Create a safe leverage handler with useCallback
  const handleLeverageChange = useCallback((value: number) => {
    // Ensure the value is valid before updating state
    if (typeof value === 'number' && !isNaN(value) && value >= 1) {
      // Round to nearest 0.5 to match the slider step
      const roundedValue = Math.round(value * 2) / 2;
      setLeverage(roundedValue);
    }
  }, [setLeverage]);

  return (
    <div className="space-y-8">
      {/* Explanation text */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          {orderType === "buy" 
            ? "Apply leverage to increase your buying power and potential returns." 
            : "Apply leverage for short positions to increase potential returns."}
          <span className="text-amber-600 font-medium"> Higher leverage increases both potential returns and risks.</span>
        </p>
      </div>

      {/* Leverage option cards */}
      <LeveragePresets 
        leverage={leverage}
        setLeverage={handleLeverageChange}
      />

      {/* Custom leverage slider */}
      <div className="pt-8 border-t border-gray-200 space-y-4">
        <LeverageSlider
          leverage={leverage}
          setLeverage={handleLeverageChange}
        />

        {/* Risk information */}
        <LeverageWarning leverage={leverage} />
      </div>
    </div>
  );
};

export default React.memo(TradingLeverageOptions);
