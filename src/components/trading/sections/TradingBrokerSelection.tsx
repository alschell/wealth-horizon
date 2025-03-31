
import React, { useState, useCallback } from "react";
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

  // Use useCallback to avoid recreation of function on every render
  const handleBrokerSelect = useCallback((brokerId: string, e: React.MouseEvent | React.KeyboardEvent) => {
    // Prevent default behavior and stop propagation
    e.preventDefault();
    e.stopPropagation();
    
    // Don't update if already selected to prevent unnecessary renders
    if (selectedBroker !== brokerId) {
      setSelectedBroker(brokerId);
    }
  }, [setSelectedBroker, selectedBroker]);

  // Input change handler with stopPropagation to prevent bubbling
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSearchQuery(e.target.value);
  }, []);
  
  // Create a memoized handler for keyboard navigation
  const handleKeyDown = useCallback((brokerId: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleBrokerSelect(brokerId, e);
    }
  }, [handleBrokerSelect]);

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

      {/* Best Execution Card - Optimized */}
      <div 
        role="button"
        tabIndex={0}
        className={`w-full text-left p-4 cursor-pointer transition-all mb-6 border rounded-lg ${
          selectedBroker === "best" 
            ? "ring-2 ring-black bg-gray-50" 
            : "hover:bg-gray-50"
        }`} 
        onClick={(e) => handleBrokerSelect("best", e)}
        onKeyDown={(e) => handleKeyDown("best", e)}
      >
        <div className="flex items-center">
          <div>
            <h4 className="text-base font-semibold">Best Execution</h4>
            <p className="text-xs text-gray-600 mt-1">Automatically route to optimal broker</p>
            {selectedBroker === "best" && (
              <p className="text-green-600 text-xs mt-2">Currently selected</p>
            )}
          </div>
          <div className="ml-auto flex items-center">
            <span className="text-green-600 text-xs mr-2 font-medium">Recommended</span>
            {selectedBroker === "best" && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded">Selected</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Specific Brokers Section - Optimized */}
      <div>
        <h4 className="text-base font-medium mb-3">Specific Brokers</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredBrokers.map((broker) => (
            <div 
              key={broker.id} 
              role="button"
              tabIndex={0}
              onClick={(e) => handleBrokerSelect(broker.id, e)}
              onKeyDown={(e) => handleKeyDown(broker.id, e)}
              className={`p-4 cursor-pointer transition-all h-full rounded-lg border ${
                selectedBroker === broker.id 
                  ? 'ring-2 ring-black bg-gray-50' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="w-full">
                <div className="font-medium text-sm">{broker.name}</div>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{broker.description}</p>
                {broker.fee && <p className="text-xs text-gray-700 mt-1">Fee: {broker.fee}</p>}
                {selectedBroker === broker.id && (
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-green-600 text-xs">Currently selected</span>
                    <span className="bg-black text-white text-xs px-2 py-0.5 rounded">Selected</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {filteredBrokers.length === 0 && (
          <p className="text-gray-500 text-center py-4">No brokers found matching your search</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(TradingBrokerSelection);
