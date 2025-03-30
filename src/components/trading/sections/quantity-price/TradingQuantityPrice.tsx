
import React from "react";
import { OrderType, Instrument } from "../../types";
import { useQuantityPrice } from "./hooks/useQuantityPrice";
import MarketOrderAlert from "./components/MarketOrderAlert";
import QuantityInput from "./components/QuantityInput";
import PriceInput from "./components/PriceInput";
import OrderSummary from "./components/OrderSummary";
import NoInstrumentSelected from "./components/NoInstrumentSelected";

interface TradingQuantityPriceProps {
  orderType: OrderType;
  selectedInstrument: Instrument | null;
  quantity: number | "";
  setQuantity: (quantity: number | "") => void;
  price: number | "";
  setPrice: (price: number | "") => void;
  orderExecutionType: string;
  [key: string]: any;
}

const TradingQuantityPrice: React.FC<TradingQuantityPriceProps> = ({
  orderType,
  selectedInstrument,
  quantity,
  setQuantity,
  price,
  setPrice,
  orderExecutionType
}) => {
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

  const showPriceInput = orderExecutionType !== "market";

  if (!selectedInstrument) {
    return <NoInstrumentSelected />;
  }

  return (
    <div className="space-y-6">
      {orderExecutionType === "market" && <MarketOrderAlert />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <QuantityInput
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            quantityPercent={quantityPercent}
            onSliderChange={handleQuantitySliderChange}
            orderType={orderType}
            maxRecommendedQuantity={maxRecommendedQuantity}
          />

          {showPriceInput && selectedInstrument && (
            <PriceInput
              price={price}
              onPriceChange={handlePriceChange}
              orderExecutionType={orderExecutionType}
              selectedInstrument={selectedInstrument}
            />
          )}
        </div>

        <OrderSummary
          selectedInstrument={selectedInstrument}
          orderType={orderType}
          orderExecutionType={orderExecutionType}
          quantity={quantity}
          price={price}
          total={total}
        />
      </div>
    </div>
  );
};

export default TradingQuantityPrice;
