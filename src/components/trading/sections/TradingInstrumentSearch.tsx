
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
      <div>
        <h2 className="text-xl font-semibold mb-6">Type & Instrument</h2>
        <h3 className="text-lg font-medium mb-2">Instrument</h3>
      </div>

      <div className="space-y-4">
        <SearchBar
          searchTerm={searchQuery}
          setSearchTerm={setSearchQuery}
          isSearching={isLoading}
        />

        {selectedInstrument && (
          <div className="mb-6">
            <SelectedInstrumentCard 
              instrument={selectedInstrument} 
              onClear={clearSelectedInstrument}
            />
          </div>
        )}

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
