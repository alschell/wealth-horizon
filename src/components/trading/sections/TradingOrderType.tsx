
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/custom-select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderTypeProps {
  orderExecutionType: string;
  setOrderExecutionType: (type: string) => void;
  timeInForce: string;
  setTimeInForce: (timeInForce: string) => void;
  gtdDate?: Date;
  setGtdDate: (date?: Date) => void;
}

const TradingOrderType: React.FC<OrderTypeProps> = ({
  orderExecutionType,
  setOrderExecutionType,
  timeInForce,
  setTimeInForce,
  gtdDate,
  setGtdDate
}) => {
  const handleDateSelect = (date?: Date) => {
    setGtdDate(date);
  };

  const validityOptions = [
    "Day Only",
    "Good Till Canceled (GTC)",
    "Good Till Date (GTD)",
    "Immediate or Cancel (IOC)",
    "Fill or Kill (FOK)",
    "All or None (AON)"
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Order Execution</h3>
        
        <div className="flex flex-row items-center justify-start gap-4 mb-6">
          <Button
            variant={orderExecutionType === "market" ? "default" : "outline"}
            className={cn(
              "flex-1 h-14",
              orderExecutionType === "market" && "bg-black text-white hover:bg-gray-800"
            )}
            onClick={() => setOrderExecutionType("market")}
          >
            Market
          </Button>
          
          <Button
            variant={orderExecutionType === "limit" ? "default" : "outline"}
            className={cn(
              "flex-1 h-14",
              orderExecutionType === "limit" && "bg-black text-white hover:bg-gray-800"
            )}
            onClick={() => setOrderExecutionType("limit")}
          >
            Limit
          </Button>
          
          <Button
            variant={orderExecutionType === "stop" ? "default" : "outline"}
            className={cn(
              "flex-1 h-14",
              orderExecutionType === "stop" && "bg-black text-white hover:bg-gray-800"
            )}
            onClick={() => setOrderExecutionType("stop")}
          >
            Stop
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Validity</h3>
        
        <CustomSelect
          id="validity"
          label=""
          value={timeInForce === "day" ? "Day Only" : 
                timeInForce === "gtc" ? "Good Till Canceled (GTC)" : 
                timeInForce === "gtd" ? "Good Till Date (GTD)" : timeInForce}
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
          className="w-full"
        />
        
        {timeInForce === "gtd" && (
          <div className="pt-4">
            <Label htmlFor="date" className="mb-2 block">
              Select Expiry Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
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
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingOrderType;
