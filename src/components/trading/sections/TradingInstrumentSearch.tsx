
import React, { useState } from "react";
import { useInstrumentSearch } from "../hooks/useInstrumentSearch";
import SearchBar from "../components/instrument-search/SearchBar";
import InstrumentResultsTable from "../components/instrument-search/InstrumentResultsTable";
import NoResultsMessage from "../components/instrument-search/NoResultsMessage";
import { Instrument } from "../types";

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
      <div className="space-y-4">
        <SearchBar
          searchTerm={searchQuery}
          setSearchTerm={setSearchQuery}
          isSearching={isLoading}
        />

        {/* We've removed the SelectedInstrumentCard component */}

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
    </div>
  );
};

export default TradingInstrumentSearch;
