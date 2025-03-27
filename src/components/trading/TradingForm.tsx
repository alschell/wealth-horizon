
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TradingInstrumentSearch from "./sections/TradingInstrumentSearch";
import TradingQuantityPrice from "./sections/TradingQuantityPrice";
import TradingBrokerSelection from "./sections/TradingBrokerSelection";
import TradingAllocation from "./sections/TradingAllocation";
import TradingReview from "./sections/TradingReview";
import { useToast } from "@/components/ui/use-toast";
import { OrderType, Instrument, TradeOrder, Broker } from "./types";

interface TradingFormProps {
  orderType: OrderType;
}

const TradingForm: React.FC<TradingFormProps> = ({ orderType }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [selectedBroker, setSelectedBroker] = useState<string | "best">("best");
  const [order, setOrder] = useState<Partial<TradeOrder>>({
    orderType,
    instrumentAllocations: [],
    fundingAllocations: [],
    depositAllocations: [],
    brokerId: "best"
  });

  const steps = [
    { title: "Select Instrument", component: TradingInstrumentSearch },
    { title: "Quantity & Price", component: TradingQuantityPrice },
    { title: "Select Broker", component: TradingBrokerSelection },
    { title: "Allocate Sources/Destinations", component: TradingAllocation },
    { title: "Review Order", component: TradingReview }
  ];

  const handleNextStep = () => {
    if (currentStep === 0 && !selectedInstrument) {
      toast({
        title: "Error",
        description: "Please select an instrument to proceed",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 1 && (!quantity || !price)) {
      toast({
        title: "Error",
        description: "Please enter quantity and price to proceed",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 3) {
      // Validate allocations
      if (orderType === "buy" && (!order.fundingAllocations?.length || !order.depositAllocations?.length)) {
        toast({
          title: "Error",
          description: "Please allocate funding sources and destination portfolios",
          variant: "destructive"
        });
        return;
      }

      if (orderType === "sell" && (!order.instrumentAllocations?.length || !order.depositAllocations?.length)) {
        toast({
          title: "Error",
          description: "Please allocate source portfolios and destination cash accounts",
          variant: "destructive"
        });
        return;
      }
    }

    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmitOrder = () => {
    const totalAmount = Number(quantity) * Number(price);
    const completeOrder: TradeOrder = {
      ...order as TradeOrder,
      orderType,
      instrumentId: selectedInstrument?.id || "",
      quantity: Number(quantity),
      price: Number(price),
      totalAmount,
      brokerId: selectedBroker
    };

    // In a real app, you would submit this order to your backend
    console.log("Submitting order:", completeOrder);

    toast({
      title: "Order Submitted",
      description: `Your ${orderType} order for ${quantity} ${selectedInstrument?.symbol} has been submitted successfully.`,
    });

    // Reset form
    setSelectedInstrument(null);
    setQuantity("");
    setPrice("");
    setSelectedBroker("best");
    setOrder({
      orderType,
      instrumentAllocations: [],
      fundingAllocations: [],
      depositAllocations: [],
      brokerId: "best"
    });
    setCurrentStep(0);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="space-y-6">
      {/* Progress steps */}
      <div className="flex justify-between mb-6">
        {steps.map((step, index) => (
          <div 
            key={step.title} 
            className={`flex flex-col items-center ${index <= currentStep ? 'text-black' : 'text-gray-400'}`}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                ${index < currentStep ? 'bg-black text-white' : 
                  index === currentStep ? 'border-2 border-black' : 'border-2 border-gray-300'}`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span className="text-xs hidden md:block">{step.title}</span>
          </div>
        ))}
      </div>

      {/* Step content */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">{steps[currentStep].title}</h2>
        
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
        />
      </Card>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNextStep}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmitOrder} className="bg-green-600 hover:bg-green-700">
            Submit Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default TradingForm;
