
import React, { useState, useCallback, memo } from "react";
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
  
  // Filter brokers by search query - memoize to avoid recalculation on render
  const filteredBrokers = React.useMemo(() => {
    return searchQuery
      ? mockBrokers.filter(
          (broker) =>
            broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            broker.id.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : mockBrokers;
  }, [searchQuery]);

  // Create an optimized broker selection handler that won't cause performance issues
  const handleBrokerSelect = useCallback((brokerId: string, e?: React.MouseEvent | React.KeyboardEvent) => {
    // Stop event propagation to prevent bubbling
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Use RAF to defer state update to next frame to prevent UI blocking
    requestAnimationFrame(() => {
      // Don't update if already selected to prevent unnecessary renders
      if (selectedBroker !== brokerId) {
        setSelectedBroker(brokerId);
      }
    });
  }, [setSelectedBroker, selectedBroker]);

  // Input change handler with optimization
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Debounce search updates to prevent UI blocking
    setSearchQuery(value);
  }, []);
  
  // Keyboard handler with performance optimizations
  const handleKeyDown = useCallback((brokerId: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleBrokerSelect(brokerId, e);
    }
  }, [handleBrokerSelect]);

  // Create broker card component for better memoization
  const BrokerCard = memo(({ broker, isSelected }: { broker: any, isSelected: boolean }) => (
    <div 
      key={broker.id} 
      role="button"
      tabIndex={0}
      onClick={(e) => handleBrokerSelect(broker.id, e)}
      onKeyDown={(e) => handleKeyDown(broker.id, e)}
      className={`p-4 cursor-pointer transition-all h-full rounded-lg border ${
        isSelected ? 'ring-2 ring-black bg-gray-50' : 'hover:bg-gray-50'
      }`}
    >
      <div className="w-full">
        <div className="font-medium text-sm">{broker.name}</div>
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{broker.description}</p>
        {broker.fee && <p className="text-xs text-gray-700 mt-1">Fee: {broker.fee}</p>}
        {isSelected && (
          <div className="mt-2 flex justify-between items-center">
            <span className="text-green-600 text-xs">Currently selected</span>
            <span className="bg-black text-white text-xs px-2 py-0.5 rounded">Selected</span>
          </div>
        )}
      </div>
    </div>
  ));
  BrokerCard.displayName = "BrokerCard";

  // Best Execution Card - extracted for memoization
  const BestExecutionCard = memo(({ isSelected }: { isSelected: boolean }) => (
    <div 
      role="button"
      tabIndex={0}
      className={`w-full text-left p-4 cursor-pointer transition-all mb-6 border rounded-lg ${
        isSelected ? "ring-2 ring-black bg-gray-50" : "hover:bg-gray-50"
      }`} 
      onClick={(e) => handleBrokerSelect("best", e)}
      onKeyDown={(e) => handleKeyDown("best", e)}
    >
      <div className="flex items-center">
        <div>
          <h4 className="text-base font-semibold">Best Execution</h4>
          <p className="text-xs text-gray-600 mt-1">Automatically route to optimal broker</p>
          {isSelected && (
            <p className="text-green-600 text-xs mt-2">Currently selected</p>
          )}
        </div>
        <div className="ml-auto flex items-center">
          <span className="text-green-600 text-xs mr-2 font-medium">Recommended</span>
          {isSelected && (
            <span className="bg-black text-white text-xs px-2 py-1 rounded">Selected</span>
          )}
        </div>
      </div>
    </div>
  ));
  BestExecutionCard.displayName = "BestExecutionCard";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Select Execution Method</h3>
        <p className="text-sm text-gray-600">
          Choose either "Best Execution" to automatically route to the most favorable broker, or select a specific broker to execute this trade.
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
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>

      {/* Best Execution Card - Using memoized component */}
      <BestExecutionCard isSelected={selectedBroker === "best"} />
      
      {/* Specific Brokers Section - Using memoized components */}
      <div>
        <h4 className="text-base font-medium mb-3">Specific Brokers</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredBrokers.map((broker) => (
            <BrokerCard 
              key={broker.id}
              broker={broker}
              isSelected={selectedBroker === broker.id}
            />
          ))}
        </div>
        
        {filteredBrokers.length === 0 && (
          <p className="text-gray-500 text-center py-4">No brokers found matching your search</p>
        )}
      </div>
    </div>
  );
});

// Use React.memo to prevent unnecessary re-renders of the entire component
export default memo(TradingBrokerSelection);
