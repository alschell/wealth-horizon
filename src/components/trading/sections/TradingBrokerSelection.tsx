
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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

      {/* Search Bar */}
      <div className="mb-4">
        <Label htmlFor="broker-search" className="text-sm mb-1 block">
          Search Brokers
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

      {/* Best Execution Card */}
      <Card 
        className={`p-3 cursor-pointer transition-all mb-4 ${selectedBroker === "best" ? "ring-2 ring-black" : "hover:bg-gray-50"}`} 
        onClick={() => handleBrokerSelect("best")}
      >
        <div className="flex items-center">
          <div>
            <h4 className="text-base font-semibold">Best Execution</h4>
            <p className="text-xs text-gray-600">Automatically route to optimal broker</p>
          </div>
          <span className="text-green-600 text-xs ml-auto">Recommended</span>
        </div>
      </Card>
      
      {/* Specific Brokers Grid */}
      <div>
        <h4 className="text-base font-medium mb-3">Specific Brokers</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredBrokers.map((broker) => (
            <Card 
              key={broker.id} 
              className={`p-3 cursor-pointer transition-all h-full ${selectedBroker === broker.id ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
              onClick={() => handleBrokerSelect(broker.id)}
            >
              <div className="w-full">
                <div className="font-medium text-sm">{broker.name}</div>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{broker.description}</p>
                {broker.fee && <p className="text-xs text-gray-700 mt-1">Fee: {broker.fee}</p>}
              </div>
            </Card>
          ))}
        </div>
        
        {filteredBrokers.length === 0 && (
          <p className="text-gray-500 text-center py-4">No brokers found matching your search</p>
        )}
      </div>
    </div>
  );
};

export default TradingBrokerSelection;
