
import React, { useState, useCallback, memo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockBrokers } from "../data/brokers";
import { Broker } from "../types";

interface TradingBrokerSelectionProps {
  selectedBroker: string | "best";
  setSelectedBroker: (broker: string | "best") => void;
}

const BrokerCard = memo(({ 
  broker, 
  isSelected,
  onSelect
}: { 
  broker: Broker;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) => (
  <div 
    role="button"
    tabIndex={0}
    onClick={() => onSelect(broker.id)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(broker.id);
      }
    }}
    className={`p-4 cursor-pointer transition-all h-full rounded-lg border ${
      isSelected ? 'ring-2 ring-black bg-gray-50' : 'hover:bg-gray-50'
    }`}
    aria-pressed={isSelected}
  >
    <div className="w-full">
      <div className="font-medium text-sm">{broker.name}</div>
      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{broker.description}</p>
      {broker.fee && <p className="text-xs text-gray-700 mt-1">Fee: {broker.fee}</p>}
    </div>
  </div>
));

BrokerCard.displayName = "BrokerCard";

const BestExecutionCard = memo(({ 
  isSelected,
  onSelect
}: { 
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <div 
    role="button"
    tabIndex={0}
    className={`w-full text-left p-4 cursor-pointer transition-all mb-6 border rounded-lg ${
      isSelected ? "ring-2 ring-black bg-gray-50" : "hover:bg-gray-50"
    }`} 
    onClick={onSelect}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect();
      }
    }}
    aria-pressed={isSelected}
  >
    <div className="flex items-center">
      <div>
        <h4 className="text-base font-semibold">Best Execution</h4>
        <p className="text-xs text-gray-600 mt-1">Automatically route to optimal broker</p>
      </div>
      <div className="ml-auto flex items-center">
        <span className="text-green-600 text-xs mr-2 font-medium">Recommended</span>
      </div>
    </div>
  </div>
));

BestExecutionCard.displayName = "BestExecutionCard";

const TradingBrokerSelection: React.FC<TradingBrokerSelectionProps> = ({
  selectedBroker,
  setSelectedBroker,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter brokers by search query - memoized to avoid recalculation
  const filteredBrokers = React.useMemo(() => {
    if (!searchQuery) return mockBrokers;
    
    const query = searchQuery.toLowerCase();
    return mockBrokers.filter(
      (broker) =>
        broker.name.toLowerCase().includes(query) ||
        broker.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Selection handler with debounce to prevent UI blocking
  const handleBrokerSelect = useCallback((brokerId: string) => {
    if (selectedBroker === brokerId) return;
    
    // Use setTimeout to defer state updates
    setTimeout(() => {
      setSelectedBroker(brokerId);
    }, 0);
  }, [selectedBroker, setSelectedBroker]);

  // Best execution handler
  const handleBestExecutionSelect = useCallback(() => {
    if (selectedBroker === "best") return;
    
    // Use setTimeout to defer state updates
    setTimeout(() => {
      setSelectedBroker("best");
    }, 0);
  }, [selectedBroker, setSelectedBroker]);

  // Input change handler
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Select Execution Method</h3>
        <p className="text-sm text-gray-600">
          Choose either "Best Execution" to automatically route to the most favorable broker, or select a specific broker to execute this trade.
        </p>
      </div>

      {/* Best Execution Card */}
      <BestExecutionCard 
        isSelected={selectedBroker === "best"} 
        onSelect={handleBestExecutionSelect}
      />
      
      {/* Search Bar - moved below Best Execution */}
      <div className="mb-4">
        <Label htmlFor="broker-search" className="text-sm mb-1 block">
          Search Brokers
        </Label>
        <div className="relative">
          <Input
            id="broker-search"
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>
      
      {/* Specific Brokers Section */}
      <div>
        <h4 className="text-base font-medium mb-3">Specific Brokers</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredBrokers.map((broker) => (
            <BrokerCard 
              key={broker.id}
              broker={broker}
              isSelected={selectedBroker === broker.id}
              onSelect={() => handleBrokerSelect(broker.id)}
            />
          ))}
        </div>
        
        {filteredBrokers.length === 0 && (
          <p className="text-gray-500 text-center py-4">No brokers found matching your search</p>
        )}
      </div>
    </div>
  );
};

export default memo(TradingBrokerSelection);
