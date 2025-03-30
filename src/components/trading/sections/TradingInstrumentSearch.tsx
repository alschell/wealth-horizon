
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useInstrumentSearch } from "../hooks/useInstrumentSearch";
import InstrumentResultsTable from "../components/instrument-search/InstrumentResultsTable";
import SelectedInstrumentCard from "../components/instrument-search/SelectedInstrumentCard";
import NoResultsMessage from "../components/instrument-search/NoResultsMessage";
import { OrderType } from "../types";
import SearchBar from "../components/instrument-search/SearchBar";

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

  // Live search after each keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      }
    }, 300); // Small debounce for better UX

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

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
              Select an instrument
            </h3>
          </div>

          <div className="relative">
            <Label htmlFor="search" className="text-base mb-1 block">
              Search <span className="text-red-500">*</span>
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
          </div>

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
            <button className="text-blue-600 hover:underline" onClick={handleClearSelection}>
              Change Security
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingInstrumentSearch;
