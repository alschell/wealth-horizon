
import React, { useCallback, memo } from "react";
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
  // Create a safe leverage handler that ensures we always pass a number
  const handleLeverageChange = useCallback((value: number) => {
    console.log("Setting leverage to:", value);
    if (typeof value === 'number' && !isNaN(value) && value >= 1) {
      // Round to nearest 0.5 to match the slider step
      const roundedValue = Math.round(value * 2) / 2;
      setLeverage(roundedValue);
    } else {
      console.warn("Invalid leverage value:", value);
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

// Using React.memo with custom comparison to prevent unnecessary re-renders
export default memo(TradingLeverageOptions, (prevProps, nextProps) => {
  return (
    prevProps.leverage === nextProps.leverage && 
    prevProps.orderType === nextProps.orderType
  );
});
