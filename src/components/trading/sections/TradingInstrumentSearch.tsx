
import React, { useState, useEffect } from "react";
import { Instrument } from "../types";
import { mockInstruments } from "../data";
import SearchBar from "../components/instrument-search/SearchBar";
import InstrumentResultsTable from "../components/instrument-search/InstrumentResultsTable";
import SelectedInstrumentCard from "../components/instrument-search/SelectedInstrumentCard";
import NoResultsMessage from "../components/instrument-search/NoResultsMessage";

interface TradingInstrumentSearchProps {
  selectedInstrument: Instrument | null;
  setSelectedInstrument: (instrument: Instrument | null) => void;
  [key: string]: any;
}

const TradingInstrumentSearch: React.FC<TradingInstrumentSearchProps> = ({
  selectedInstrument,
  setSelectedInstrument
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Instrument[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Auto-search when typing
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      setIsSearching(true);
      
      // Add a small delay to avoid too many searches while typing
      const debounceTimer = setTimeout(() => {
        // Filter instruments based on search term (symbol, name, or ISIN)
        const results = mockInstruments.filter(
          instrument => 
            instrument.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
            instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (instrument.isin && instrument.isin.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setSearchResults(results);
        setIsSearching(false);
      }, 300);
      
      return () => clearTimeout(debounceTimer);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API search with mock data
    setTimeout(() => {
      const results = mockInstruments.filter(
        instrument => 
          instrument.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
          instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (instrument.isin && instrument.isin.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const handleSelectInstrument = (instrument: Instrument) => {
    // Toggle selection: if already selected, deselect it
    if (selectedInstrument?.id === instrument.id) {
      setSelectedInstrument(null);
    } else {
      setSelectedInstrument(instrument);
    }
  };

  return (
    <div className="space-y-6">
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        isSearching={isSearching}
      />

      {isSearching && (
        <div className="text-center p-4">
          <p>Searching for instruments...</p>
        </div>
      )}

      {searchResults.length > 0 && !isSearching && (
        <InstrumentResultsTable 
          searchResults={searchResults}
          selectedInstrument={selectedInstrument}
          onSelectInstrument={handleSelectInstrument}
        />
      )}

      {searchResults.length === 0 && searchTerm && !isSearching && (
        <NoResultsMessage searchTerm={searchTerm} />
      )}

      {selectedInstrument && (
        <SelectedInstrumentCard instrument={selectedInstrument} />
      )}
    </div>
  );
};

export default TradingInstrumentSearch;
