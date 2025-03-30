
import React from "react";
import { useInstrumentSearch } from "../hooks/useInstrumentSearch";
import SearchBar from "../components/instrument-search/SearchBar";
import InstrumentResultsTable from "../components/instrument-search/InstrumentResultsTable";
import NoResultsMessage from "../components/instrument-search/NoResultsMessage";
import { Instrument } from "../types";
import SelectedInstrumentCard from "../components/instrument-search/SelectedInstrumentCard";

interface TradingInstrumentSearchProps {
  setSelectedInstrument: (instrument: Instrument | null) => void;
  selectedInstrument: Instrument | null;
  orderType: string;
}

const TradingInstrumentSearch: React.FC<TradingInstrumentSearchProps> = ({ 
  setSelectedInstrument, 
  selectedInstrument,
  orderType
}) => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
    error,
    handleSelectInstrument,
    clearSelectedInstrument
  } = useInstrumentSearch({
    setSelectedInstrument,
    orderType
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2 mb-6">
        <p className="text-sm text-gray-600">
          Search and select the financial instrument you wish to trade
        </p>
      </div>

      {selectedInstrument ? (
        <div className="mb-6">
          <SelectedInstrumentCard 
            instrument={selectedInstrument} 
            onClear={clearSelectedInstrument}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <SearchBar
            searchTerm={searchQuery}
            setSearchTerm={setSearchQuery}
            isSearching={isLoading}
          />

          {error ? (
            <div className="text-red-500 text-sm">{error}</div>
          ) : searchQuery && searchResults.length === 0 && !isLoading ? (
            <NoResultsMessage searchTerm={searchQuery} />
          ) : searchResults.length > 0 ? (
            <InstrumentResultsTable
              searchResults={searchResults}
              selectedInstrument={selectedInstrument}
              onSelectInstrument={handleSelectInstrument}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TradingInstrumentSearch;
