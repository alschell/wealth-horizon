
import React from "react";
import { OrderType, Instrument, TradeOrder } from "../types";

interface StepRendererProps {
  CurrentStepComponent: React.ComponentType<any>;
  stepTitle: string;
  orderType: OrderType;
  selectedInstrument: Instrument | null;
  setSelectedInstrument: (instrument: Instrument | null) => void;
  quantity: number | "";
  setQuantity: (quantity: number | "") => void;
  price: number | "";
  setPrice: (price: number | "") => void;
  selectedBroker: string | "best";
  setSelectedBroker: (broker: string | "best") => void;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  orderExecutionType: string;
  setOrderExecutionType: (type: string) => void;
  timeInForce: string;
  setTimeInForce: (time: string) => void;
  leverage: number;
  setLeverage: (leverage: number) => void;
  setCurrentStep: (step: number) => void;
  renderError: string | null;
  ensureOrderHasAllocations: () => void;
}

const TradingStepRenderer: React.FC<StepRendererProps> = ({
  CurrentStepComponent,
  stepTitle,
  orderType,
  selectedInstrument,
  setSelectedInstrument,
  quantity,
  setQuantity,
  price,
  setPrice,
  selectedBroker,
  setSelectedBroker,
  order,
  setOrder,
  orderExecutionType,
  setOrderExecutionType,
  timeInForce,
  setTimeInForce,
  leverage,
  setLeverage,
  setCurrentStep,
  renderError,
  ensureOrderHasAllocations
}) => {
  try {
    if (!CurrentStepComponent) {
      console.error("No component found for this step");
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">Component not found for this step.</p>
        </div>
      );
    }

    console.log(`Rendering step with component:`, {
      component: CurrentStepComponent.name || "Unknown",
      orderType,
      selectedBroker,
      orderExecutionType
    });

    // Ensure we initialize the order properly before rendering components
    ensureOrderHasAllocations();

    return (
      <>
        {stepTitle && <h2 className="text-xl font-semibold mb-6">{stepTitle}</h2>}
        
        <CurrentStepComponent 
          orderType={orderType}
          selectedInstrument={selectedInstrument}
          setSelectedInstrument={setSelectedInstrument}
          quantity={quantity}
          setQuantity={setQuantity}
          price={price}
          setPrice={setPrice}
          selectedBroker={selectedBroker}
          setSelectedBroker={setSelectedBroker}
          order={order}
          setOrder={setOrder}
          orderExecutionType={orderExecutionType}
          setOrderExecutionType={setOrderExecutionType}
          timeInForce={timeInForce}
          setTimeInForce={setTimeInForce}
          leverage={leverage}
          setLeverage={setLeverage}
          setCurrentStep={setCurrentStep}
        />
      </>
    );
  } catch (error) {
    console.error("Error rendering trading step:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return (
      <div className="text-center py-12 text-red-500">
        <p>An error occurred while rendering this step.</p>
        <p className="text-sm mt-2">{renderError || errorMessage}</p>
      </div>
    );
  }
};

export default TradingStepRenderer;
