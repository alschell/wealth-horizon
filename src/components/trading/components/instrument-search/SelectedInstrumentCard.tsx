
import React from "react";
import { Instrument } from "../../types";
import { Button } from "@/components/ui/button";

interface SelectedInstrumentCardProps {
  instrument: Instrument;
  onClear?: () => void;
}

const SelectedInstrumentCard: React.FC<SelectedInstrumentCardProps> = ({ instrument, onClear }) => {
  return (
    <div className="mt-6 p-4 border rounded-md bg-gray-50">
      <h3 className="font-semibold mb-2">Selected Instrument</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">Symbol</p>
          <p className="font-medium">{instrument.symbol}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p>{instrument.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Current Price</p>
          <p className="font-medium">
            {instrument.currentPrice.toLocaleString('en-US', {
              style: 'currency',
              currency: instrument.currency
            })}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Type</p>
          <p>{instrument.type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Exchange</p>
          <p>{instrument.exchange}</p>
        </div>
        {instrument.isin && (
          <div>
            <p className="text-sm text-gray-500">ISIN</p>
            <p>{instrument.isin}</p>
          </div>
        )}
      </div>
      {onClear && (
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onClear}
          >
            Unselect
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectedInstrumentCard;
