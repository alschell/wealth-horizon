
import React, { useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

interface ValiditySelectorProps {
  timeInForce: string;
  setTimeInForce: (timeInForce: string) => void;
  gtdDate?: Date;
  setGtdDate: (date?: Date) => void;
}

const ValiditySelector: React.FC<ValiditySelectorProps> = ({
  timeInForce,
  setTimeInForce,
  gtdDate,
  setGtdDate
}) => {
  // Descriptions for each validity option
  const validityDescriptions: Record<string, string> = {
    "day": "Order valid only for the current trading day.",
    "gtc": "Order remains active until executed or canceled.",
    "gtd": "Order remains active until the specified date or execution.",
    "ioc": "Order must be executed immediately, or the unfilled portion is canceled.",
    "fok": "Order must be executed in its entirety immediately or canceled completely.",
    "aon": "Order must be executed in its entirety or not at all."
  };

  const validityOptions = [
    "Day Only",
    "Good Till Canceled (GTC)",
    "Good Till Date (GTD)",
    "Immediate or Cancel (IOC)",
    "Fill or Kill (FOK)",
    "All or None (AON)"
  ];
  
  // Reset gtdDate when switching away from GTD
  const handleTimeInForceChange = (value: string) => {
    let newTimeInForce = "";
    
    if (value.includes("Day Only")) newTimeInForce = "day";
    else if (value.includes("Good Till Canceled")) newTimeInForce = "gtc";
    else if (value.includes("Good Till Date")) newTimeInForce = "gtd";
    else if (value.includes("Immediate or Cancel")) newTimeInForce = "ioc";
    else if (value.includes("Fill or Kill")) newTimeInForce = "fok";
    else if (value.includes("All or None")) newTimeInForce = "aon";
    
    setTimeInForce(newTimeInForce);
    
    // Reset date if switching away from GTD
    if (newTimeInForce !== "gtd" && gtdDate) {
      setGtdDate(undefined);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">Validity</h3>
      
      <div>
        <CustomSelect
          id="validity"
          label=""
          value={timeInForce === "day" ? "Day Only" : 
                timeInForce === "gtc" ? "Good Till Canceled (GTC)" : 
                timeInForce === "gtd" ? "Good Till Date (GTD)" : 
                timeInForce === "ioc" ? "Immediate or Cancel (IOC)" :
                timeInForce === "fok" ? "Fill or Kill (FOK)" : 
                timeInForce === "aon" ? "All or None (AON)" : timeInForce}
          placeholder="Select validity option"
          options={validityOptions}
          onChange={handleTimeInForceChange}
          className="w-full text-sm focus-within:ring-black focus-within:border-black"
        />
        {timeInForce && (
          <p className="mt-2 text-xs text-gray-600">
            {validityDescriptions[timeInForce] || "Select a validity option."}
          </p>
        )}
      </div>
      
      {timeInForce === "gtd" && (
        <div className="pt-2 text-left">
          <DatePicker
            id="expiryDate"
            label="Select Expiry Date"
            value={gtdDate}
            onChange={setGtdDate}
            placeholder="Select date"
            optional={false}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default ValiditySelector;
