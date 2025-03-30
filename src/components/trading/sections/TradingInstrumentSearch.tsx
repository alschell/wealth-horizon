
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, AlertCircle } from "lucide-react";
import { useInstrumentSearch } from "../hooks/useInstrumentSearch";
import InstrumentResultsTable from "../components/instrument-search/InstrumentResultsTable";
import SelectedInstrumentCard from "../components/instrument-search/SelectedInstrumentCard";
import NoResultsMessage from "../components/instrument-search/NoResultsMessage";
import { OrderType } from "../types";

interface TradingInstrumentSearchProps {
  orderType: OrderType;
  selectedInstrument: any;
  setSelectedInstrument: (instrument: any) => void;
}

const TradingInstrumentSearch: React.FC<TradingInstrumentSearchProps> = ({
  orderType, 
  selectedInstrument,
  setSelectedInstrument
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { results, isSearching, performSearch } = useInstrumentSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const handleSelectInstrument = (instrument: any) => {
    setSelectedInstrument(instrument);
  };

  const handleClearSelection = () => {
    setSelectedInstrument(null);
  };

  return (
    <div className="space-y-6">
      {!selectedInstrument ? (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">
              {orderType === 'buy' ? 'What do you want to buy?' : 'What do you want to sell?'}
            </h3>
            <p className="text-sm text-gray-600">
              Search for stocks, ETFs, mutual funds, or other securities.
            </p>
          </div>

          <form onSubmit={handleSearch}>
            <div className="relative">
              <Label htmlFor="search" className="text-base mb-1 block">
                Security Search <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder="Enter ticker symbol, name, or ISIN"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  required
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              <div className="mt-2">
                <Button type="submit" disabled={isSearching || !searchQuery.trim()}>
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
          </form>

          {results.length > 0 && (
            <InstrumentResultsTable 
              searchResults={results} 
              selectedInstrument={selectedInstrument}
              onSelectInstrument={handleSelectInstrument}
            />
          )}
          
          {results.length === 0 && searchQuery.trim() !== "" && !isSearching && (
            <NoResultsMessage searchTerm={searchQuery} />
          )}

        </div>
      ) : (
        <div className="space-y-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Selected Security</h3>
          </div>
          
          <SelectedInstrumentCard 
            instrument={selectedInstrument}
          />
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleClearSelection}>
              Change Security
            </Button>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                {orderType === 'buy' 
                  ? `You are about to set up a buy order for ${selectedInstrument.name}. In the next steps, you'll specify quantity, price, and allocation details.`
                  : `You are about to set up a sell order for ${selectedInstrument.name}. Make sure you have sufficient holdings before proceeding.`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingInstrumentSearch;
