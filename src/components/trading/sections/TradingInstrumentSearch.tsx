
import React, { useState, useEffect } from "react";
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
      performSearch(searchQuery);
    }, 300); // Small debounce for better UX

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  const handleSelectInstrument = (instrument: any) => {
    setSelectedInstrument(instrument);
  };

  return (
    <div className="space-y-6">
      {!selectedInstrument ? (
        <div className="space-y-6">
          <div className="relative">
            <SearchBar
              searchTerm={searchQuery}
              setSearchTerm={setSearchQuery}
              isSearching={isSearching}
            />
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
        </div>
      )}
    </div>
  );
};

export default TradingInstrumentSearch;
