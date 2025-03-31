
import React from "react";
import { Instrument } from "../../types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SelectedInstrumentCardProps {
  instrument: Instrument;
  onClear?: () => void;
}

const SelectedInstrumentCard: React.FC<SelectedInstrumentCardProps> = ({ instrument, onClear }) => {
  return (
    <div className="bg-white border rounded-md p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center">
            <h4 className="text-lg font-semibold">{instrument.symbol}</h4>
            <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
              {instrument.exchange}
            </span>
          </div>
          <p className="text-gray-600 mt-1">{instrument.name}</p>
          <div className="mt-2 flex items-center">
            <span className="font-medium">{instrument.currentPrice} {instrument.currency}</span>
            {instrument.isin && (
              <span className="ml-2 text-xs text-gray-500">
                ISIN: {instrument.isin}
              </span>
            )}
          </div>
        </div>
        {onClear && (
          <Button
            variant="ghost"
            size="sm" 
            onClick={onClear}
            className="hover:bg-gray-100 p-1 h-auto"
          >
            <X className="h-4 w-4 text-gray-500" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SelectedInstrumentCard;
