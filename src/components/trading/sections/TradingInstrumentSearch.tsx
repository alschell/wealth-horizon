
import React, { useState } from "react";
import { useInstrumentSearch } from "../hooks/useInstrumentSearch";
import SearchBar from "../components/instrument-search/SearchBar";
import InstrumentResultsTable from "../components/instrument-search/InstrumentResultsTable";
import SelectedInstrumentCard from "../components/instrument-search/SelectedInstrumentCard";
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
      <div>
        <h2 className="text-xl font-medium mb-2">
          Instrument <span className="text-red-500">*</span>
        </h2>
        <p className="text-sm text-gray-600">
          Search for an instrument to {orderType === "buy" ? "buy" : "sell"}.
        </p>
      </div>

      {!selectedInstrument ? (
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
      ) : (
        <SelectedInstrumentCard
          instrument={selectedInstrument}
          onClear={clearSelectedInstrument}
        />
      )}
    </div>
  );
};

export default TradingInstrumentSearch;
