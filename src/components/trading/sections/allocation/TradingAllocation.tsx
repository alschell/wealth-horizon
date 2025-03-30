
import React, { useState, useEffect } from "react";
import { OrderType, TradeOrder } from "../../types";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Info, AlertCircle } from "lucide-react";

// Import allocation section components from their correct paths
import BuyAllocationSection from "./buy/BuyAllocationSection";
import SellAllocationSection from "./sell/SellAllocationSection";

interface TradingAllocationProps {
  orderType: OrderType;
  selectedInstrument: any;
  quantity: number | "";
  price: number | "";
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  [key: string]: any;
}

const TradingAllocation: React.FC<TradingAllocationProps> = ({
  orderType,
  selectedInstrument,
  quantity,
  price,
  order,
  setOrder
}) => {
  const { toast } = useToast();
  const [initialized, setInitialized] = useState(false);
  
  // Initialize order allocations on component mount
  useEffect(() => {
    console.log("TradingAllocation - Initializing allocations");
    try {
      const updatedOrder = { ...order };
      
      // Initialize allocation arrays based on order type
      if (orderType === "buy") {
        updatedOrder.fundingAllocations = updatedOrder.fundingAllocations || [];
        updatedOrder.depositAllocations = updatedOrder.depositAllocations || [];
      } else {
        updatedOrder.instrumentAllocations = updatedOrder.instrumentAllocations || [];
        updatedOrder.depositAllocations = updatedOrder.depositAllocations || [];
      }
      
      setOrder(updatedOrder);
      setInitialized(true);
    } catch (error) {
      console.error("Error initializing allocations:", error);
      toast({
        title: "Allocation Error",
        description: "Failed to initialize allocations. Please try refreshing.",
        variant: "destructive"
      });
    }
  }, []);

  // Calculate total amount from quantity and price
  const totalAmount = typeof quantity === 'number' && (typeof price === 'number' || selectedInstrument?.currentPrice)
    ? quantity * (typeof price === 'number' ? price : selectedInstrument?.currentPrice || 0)
    : 0;

  // Fallback to USD if no currency specified
  const currency = selectedInstrument?.currency || "USD";

  // Show loading state while initializing
  if (!initialized) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Loading Allocation Options...</h3>
        <div className="h-60 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }
  
  // If no instrument is selected or quantity is not set
  if (!selectedInstrument || typeof quantity !== 'number' || quantity <= 0) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please select an instrument and specify a valid quantity before allocating.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-4 bg-blue-50 border-blue-100">
        <div className="flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-blue-700 text-sm">
              {orderType === "buy" 
                ? `You're allocating ${quantity} shares with a total value of approximately ${totalAmount.toLocaleString('en-US', { style: 'currency', currency })}.`
                : `You're selling ${quantity} shares with expected proceeds of approximately ${totalAmount.toLocaleString('en-US', { style: 'currency', currency })}.`}
            </p>
          </div>
        </div>
      </Card>

      {/* Render appropriate allocation component based on order type */}
      {orderType === "buy" ? (
        <BuyAllocationSection
          totalAmount={totalAmount}
          quantity={typeof quantity === 'number' ? quantity : 0}
          currency={currency}
          selectedInstrument={selectedInstrument}
          order={order}
          setOrder={setOrder}
          price={typeof price === 'number' ? price : selectedInstrument?.currentPrice || 0}
        />
      ) : (
        <SellAllocationSection
          totalAmount={totalAmount}
          quantity={typeof quantity === 'number' ? quantity : 0}
          currency={currency}
          selectedInstrument={selectedInstrument}
          order={order}
          setOrder={setOrder}
          price={typeof price === 'number' ? price : selectedInstrument?.currentPrice || 0}
        />
      )}
    </div>
  );
};

export default TradingAllocation;
