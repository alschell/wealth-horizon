
import React from "react";
import { Instrument, OrderType } from "../../types";
import NoInstrumentSelected from "./components/NoInstrumentSelected";
import QuantityInput from "./components/QuantityInput";
import PriceInput from "./components/PriceInput";
import MarketOrderAlert from "./components/MarketOrderAlert";
import OrderSummary from "./components/OrderSummary";
import { useQuantityPrice } from "./hooks/useQuantityPrice";

interface TradingQuantityPriceProps {
  selectedInstrument: Instrument | null;
  orderType: OrderType;
  quantity: number | "";
  setQuantity: (quantity: number | "") => void;
  price: number | "";
  setPrice: (price: number | "") => void;
  orderExecutionType: string;
}

const TradingQuantityPrice: React.FC<TradingQuantityPriceProps> = ({
  selectedInstrument,
  orderType,
  quantity,
  setQuantity,
  price,
  setPrice,
  orderExecutionType,
}) => {
  // If no instrument is selected, show a warning
  if (!selectedInstrument) {
    return <NoInstrumentSelected />;
  }

  // Use our custom hook for quantity and price logic
  const {
    total,
    quantityPercent,
    maxRecommendedQuantity,
    handleQuantityChange,
    handleQuantitySliderChange,
    handlePriceChange
  } = useQuantityPrice({
    selectedInstrument,
    quantity,
    setQuantity,
    price,
    setPrice,
    orderExecutionType
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-2">
          {orderType === "buy" ? "Buy" : "Sell"}{" "}
          {selectedInstrument.name} ({selectedInstrument.symbol})
        </h2>
        <p className="text-sm text-gray-500">
          Enter the quantity and price details for this order
        </p>
      </div>

      {orderExecutionType === "market" && <MarketOrderAlert />}

      <div className="space-y-4">
        <QuantityInput
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          quantityPercent={quantityPercent}
          onSliderChange={handleQuantitySliderChange}
          orderType={orderType}
          maxRecommendedQuantity={maxRecommendedQuantity}
        />

        {orderExecutionType !== "market" && (
          <PriceInput
            price={price}
            onPriceChange={handlePriceChange}
            selectedInstrument={selectedInstrument}
            orderExecutionType={orderExecutionType}
          />
        )}

        {(typeof quantity === "number" && quantity > 0) &&
          ((typeof price === "number" && price > 0) ||
            (orderExecutionType === "market" && selectedInstrument.currentPrice > 0)) && (
            <OrderSummary
              selectedInstrument={selectedInstrument}
              orderType={orderType}
              orderExecutionType={orderExecutionType}
              quantity={quantity}
              price={price}
              total={total}
            />
          )}
      </div>
    </div>
  );
};

export default TradingQuantityPrice;
