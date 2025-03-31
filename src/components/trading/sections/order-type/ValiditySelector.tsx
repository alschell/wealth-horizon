
import React, { useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [openDatePopover, setOpenDatePopover] = useState(false);

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

  const handleDateSelect = (date?: Date) => {
    setGtdDate(date);
    // Close the popover immediately after selection
    setOpenDatePopover(false);
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
          <Label htmlFor="date" className="block text-sm font-medium mb-2">
            Select Expiry Date
          </Label>
          <Popover open={openDatePopover} onOpenChange={setOpenDatePopover}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal text-sm",
                  !gtdDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {gtdDate ? format(gtdDate, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={gtdDate}
                onSelect={handleDateSelect}
                initialFocus
                disabled={(date) => date < new Date()}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default ValiditySelector;
