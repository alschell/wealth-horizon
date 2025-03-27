
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { BarChart3, BadgeCheck, Clock, Shield } from "lucide-react";
import { mockBrokers } from "../data";
import { Badge } from "@/components/ui/badge";

interface TradingBrokerSelectionProps {
  selectedBroker: string | "best";
  setSelectedBroker: (brokerId: string | "best") => void;
  setCurrentStep?: (step: number) => void;
  [key: string]: any;
}

const TradingBrokerSelection: React.FC<TradingBrokerSelectionProps> = ({
  selectedBroker,
  setSelectedBroker,
  setCurrentStep
}) => {
  const [selectedBrokerDetails, setSelectedBrokerDetails] = useState<any>(null);

  const handleBrokerSelect = (brokerId: string) => {
    setSelectedBroker(brokerId);
    
    if (brokerId !== "best") {
      const broker = mockBrokers.find(b => b.id === brokerId);
      setSelectedBrokerDetails(broker);
    } else {
      setSelectedBrokerDetails(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-4">Select a broker to execute your trade or choose "Best Execution" to automatically select the broker offering the best price.</p>
      </div>

      <RadioGroup 
        value={selectedBroker} 
        onValueChange={handleBrokerSelect}
        className="space-y-4"
      >
        <Card className={`p-4 cursor-pointer transition-all ${selectedBroker === 'best' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
          <div className="flex items-start">
            <RadioGroupItem value="best" id="best" className="mr-2 mt-1" />
            <div>
              <Label htmlFor="best" className="cursor-pointer font-medium flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Best Execution
                <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200">Recommended</Badge>
              </Label>
              <p className="text-sm text-gray-600 mt-1 ml-7">
                Automatically routes your order to the broker offering the best price.
                Considers price, speed, and execution quality.
              </p>
              
              <div className="ml-7 mt-3 flex flex-wrap gap-3">
                <div className="flex items-center text-xs text-gray-600">
                  <BadgeCheck className="h-4 w-4 mr-1 text-green-600" />
                  Best pricing
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <Clock className="h-4 w-4 mr-1 text-green-600" />
                  Fastest execution
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <Shield className="h-4 w-4 mr-1 text-green-600" />
                  Enhanced security
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-4">
          <h3 className="font-medium mb-3">Or select a specific broker:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mockBrokers.map((broker) => (
              <Card 
                key={broker.id}
                className={`p-4 cursor-pointer transition-all ${selectedBroker === broker.id ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-center">
                  <RadioGroupItem value={broker.id} id={broker.id} className="mr-2" />
                  <Label htmlFor={broker.id} className="cursor-pointer">
                    {broker.name}
                  </Label>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </RadioGroup>

      {selectedBrokerDetails && (
        <div className="bg-gray-50 p-4 rounded-md border mt-6">
          <h3 className="font-semibold mb-2">{selectedBrokerDetails.name} Details</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Commission Rate</p>
              <p className="font-medium">0.25% per trade</p>
            </div>
            <div>
              <p className="text-gray-500">Settlement Period</p>
              <p className="font-medium">T+2</p>
            </div>
            <div>
              <p className="text-gray-500">Execution Speed</p>
              <p className="font-medium">~0.8 seconds</p>
            </div>
            <div>
              <p className="text-gray-500">Markets</p>
              <p className="font-medium">Global</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingBrokerSelection;
