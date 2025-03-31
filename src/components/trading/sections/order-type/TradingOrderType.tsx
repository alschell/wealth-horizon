
import React from "react";
import OrderExecutionTypes from "./OrderExecutionTypes";
import ValiditySelector from "./ValiditySelector";

interface OrderTypeProps {
  orderExecutionType: string;
  setOrderExecutionType: (type: string) => void;
  timeInForce: string;
  setTimeInForce: (timeInForce: string) => void;
  gtdDate?: Date;
  setGtdDate: (date?: Date) => void;
}

const TradingOrderType: React.FC<OrderTypeProps> = ({
  orderExecutionType,
  setOrderExecutionType,
  timeInForce,
  setTimeInForce,
  gtdDate,
  setGtdDate
}) => {
  return (
    <div className="space-y-8">
      <OrderExecutionTypes 
        orderExecutionType={orderExecutionType}
        setOrderExecutionType={setOrderExecutionType}
      />

      <ValiditySelector
        timeInForce={timeInForce}
        setTimeInForce={setTimeInForce}
        gtdDate={gtdDate}
        setGtdDate={setGtdDate}
      />
    </div>
  );
};

export default TradingOrderType;
