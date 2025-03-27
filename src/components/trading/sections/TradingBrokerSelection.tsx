import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { mockBrokers } from "../data";

interface TradingBrokerSelectionProps {
  selectedBroker: string | "best";
  setSelectedBroker: (brokerId: string | "best") => void;
  [key: string]: any;
}

const TradingBrokerSelection: React.FC<TradingBrokerSelectionProps> = ({
  selectedBroker,
  setSelectedBroker
}) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2">Select a broker to execute your trade or choose "Best Execution" to automatically select the broker offering the best price.</p>
      </div>

      <RadioGroup 
        value={selectedBroker} 
        onValueChange={setSelectedBroker}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2 p-3 border rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer">
          <RadioGroupItem value="best" id="best" />
          <Label htmlFor="best" className="cursor-pointer font-medium flex flex-col">
            Best Execution
            <span className="text-sm font-normal text-gray-500">Automatically routes your order to the broker offering the best price</span>
          </Label>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Or select a specific broker:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockBrokers.map((broker) => (
              <div 
                key={broker.id}
                className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <RadioGroupItem value={broker.id} id={broker.id} />
                <Label htmlFor={broker.id} className="cursor-pointer">
                  {broker.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </RadioGroup>

      <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mt-6">
        <h3 className="font-semibold text-blue-800 mb-2">About Best Execution</h3>
        <p className="text-sm text-blue-700">
          Best Execution automatically routes your order to the broker offering 
          the most favorable terms, considering factors like price, speed, 
          likelihood of execution, and costs. This option is recommended for 
          most traders seeking optimal execution quality.
        </p>
      </div>
    </div>
  );
};

export default TradingBrokerSelection;
