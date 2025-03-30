
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Instrument } from "../../types";

interface InstrumentResultsTableProps {
  searchResults: Instrument[];
  selectedInstrument: Instrument | null;
  onSelectInstrument: (instrument: Instrument | null) => void;
}

const InstrumentResultsTable: React.FC<InstrumentResultsTableProps> = ({
  searchResults,
  selectedInstrument,
  onSelectInstrument
}) => {
  return (
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
            <TableHead className="w-24 text-center">Action</TableHead>
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
              <TableCell className="text-center">
                <Button
                  variant={selectedInstrument?.id === instrument.id ? "outline" : "default"}
                  size="sm"
                  onClick={() => {
                    if (selectedInstrument?.id === instrument.id) {
                      onSelectInstrument(null);
                    } else {
                      onSelectInstrument(instrument);
                    }
                  }}
                  className="w-20"
                >
                  {selectedInstrument?.id === instrument.id ? "Unselect" : "Select"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InstrumentResultsTable;
