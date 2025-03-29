
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Instrument } from "../types";
import { mockInstruments } from "../data";

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Search by symbol, company name, or ISIN (e.g., AAPL, Apple, US0378331005)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <Button onClick={handleSearch} disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div>

      {isSearching && (
        <div className="text-center p-4">
          <p>Searching for instruments...</p>
        </div>
      )}

      {searchResults.length > 0 && !isSearching && (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden md:table-cell">ISIN</TableHead>
                <TableHead className="hidden md:table-cell">Exchange</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchResults.map((instrument) => (
                <TableRow 
                  key={instrument.id}
                  className={selectedInstrument?.id === instrument.id ? "bg-gray-100" : ""}
                >
                  <TableCell className="font-medium">{instrument.symbol}</TableCell>
                  <TableCell>{instrument.name}</TableCell>
                  <TableCell>{instrument.type}</TableCell>
                  <TableCell className="hidden md:table-cell">{instrument.isin || "—"}</TableCell>
                  <TableCell className="hidden md:table-cell">{instrument.exchange}</TableCell>
                  <TableCell>
                    {instrument.currentPrice.toLocaleString('en-US', {
                      style: 'currency',
                      currency: instrument.currency
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={selectedInstrument?.id === instrument.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSelectInstrument(instrument)}
                    >
                      {selectedInstrument?.id === instrument.id ? "Selected" : "Select"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {searchResults.length === 0 && searchTerm && !isSearching && (
        <div className="text-center p-4 border rounded-md">
          No instruments found. Try a different search term.
        </div>
      )}

      {selectedInstrument && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h3 className="font-semibold mb-2">Selected Instrument</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Symbol</p>
              <p className="font-medium">{selectedInstrument.symbol}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p>{selectedInstrument.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Price</p>
              <p className="font-medium">
                {selectedInstrument.currentPrice.toLocaleString('en-US', {
                  style: 'currency',
                  currency: selectedInstrument.currency
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p>{selectedInstrument.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Exchange</p>
              <p>{selectedInstrument.exchange}</p>
            </div>
            {selectedInstrument.isin && (
              <div>
                <p className="text-sm text-gray-500">ISIN</p>
                <p>{selectedInstrument.isin}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingInstrumentSearch;
