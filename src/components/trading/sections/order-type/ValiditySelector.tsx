
import React, { useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { Label } from "@/components/ui/label";
import DateField from "@/components/onboarding/common/fields/DateField";

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

  // Handler for date changes
  const handleDateChange = (dateString: string) => {
    if (dateString) {
      setGtdDate(new Date(dateString));
    } else {
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
          onChange={(value) => {
            if (value.includes("Day Only")) setTimeInForce("day");
            else if (value.includes("Good Till Canceled")) setTimeInForce("gtc");
            else if (value.includes("Good Till Date")) setTimeInForce("gtd");
            else if (value.includes("Immediate or Cancel")) setTimeInForce("ioc");
            else if (value.includes("Fill or Kill")) setTimeInForce("fok");
            else if (value.includes("All or None")) setTimeInForce("aon");
          }}
          className="w-full text-sm"
        />
        {timeInForce && (
          <p className="mt-2 text-xs text-gray-600">
            {validityDescriptions[timeInForce] || "Select a validity option."}
          </p>
        )}
      </div>
      
      {timeInForce === "gtd" && (
        <div className="pt-2 text-left">
          <DateField
            id="expiryDate"
            label="Select Expiry Date"
            value={gtdDate ? gtdDate.toISOString() : ""}
            onChange={handleDateChange}
            required={timeInForce === "gtd"}
            closeOnSelect={true}
          />
        </div>
      )}
    </div>
  );
};

export default ValiditySelector;
