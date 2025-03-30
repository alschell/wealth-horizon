
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockBrokers } from "../data/brokers";

interface TradingBrokerSelectionProps {
  selectedBroker: string | "best";
  setSelectedBroker: (broker: string | "best") => void;
  [key: string]: any;
}

const TradingBrokerSelection: React.FC<TradingBrokerSelectionProps> = ({
  selectedBroker,
  setSelectedBroker,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter brokers by search query
  const filteredBrokers = searchQuery
    ? mockBrokers.filter(
        (broker) =>
          broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          broker.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockBrokers;

  const handleBrokerSelect = (brokerId: string) => {
    setSelectedBroker(brokerId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Select Broker</h3>
        <p className="text-sm text-gray-600">
          Choose which broker should execute this trade or select "Best Execution" to automatically route to the most favorable broker.
        </p>
      </div>

      <Tabs defaultValue="best" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="best">Best Execution</TabsTrigger>
          <TabsTrigger value="specific">Specific Broker</TabsTrigger>
        </TabsList>
        
        <TabsContent value="best">
          <Card className={`p-5 ${selectedBroker === "best" ? "ring-2 ring-black" : ""}`} onClick={() => handleBrokerSelect("best")}>
            <div className="cursor-pointer">
              <div className="flex items-center mb-2">
                <h4 className="text-base font-semibold">Best Execution</h4>
                <span className="text-green-600 text-sm ml-2">Recommended</span>
              </div>
              <p className="text-sm text-gray-600">
                Automatically route your order to the broker offering the best execution quality, price, and lowest fees for this specific trade.
              </p>
              <ul className="mt-3 text-sm text-gray-600 list-disc list-inside">
                <li>Optimizes for best price and lowest transaction costs</li>
                <li>Considers current market conditions</li>
                <li>Evaluates broker execution speed and reliability</li>
              </ul>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="specific" className="space-y-4">
          <div className="mb-4">
            <Label htmlFor="broker-search" className="text-base mb-1 block">
              Search Brokers <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="broker-search"
                type="text"
                placeholder="Search by broker name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          <RadioGroup
            value={selectedBroker}
            onValueChange={handleBrokerSelect}
            className="space-y-3"
          >
            {filteredBrokers.map((broker) => (
              <Card 
                key={broker.id} 
                className={`p-4 cursor-pointer transition-all ${selectedBroker === broker.id ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
                onClick={() => handleBrokerSelect(broker.id)}
              >
                <div className="w-full">
                  <div className="font-medium">{broker.name}</div>
                  <p className="text-sm text-gray-600 mt-1">{broker.description}</p>
                  {broker.fee && <p className="text-sm text-gray-700 mt-1">Fee: {broker.fee}</p>}
                </div>
              </Card>
            ))}
            
            {filteredBrokers.length === 0 && (
              <p className="text-gray-500 text-center py-4">No brokers found matching your search</p>
            )}
          </RadioGroup>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradingBrokerSelection;
