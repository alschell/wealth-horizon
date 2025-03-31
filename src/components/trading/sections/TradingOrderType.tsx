
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/custom-select";
import { format } from "date-fns";
import { CalendarIcon, TrendingUp, Timer, StopCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

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
  
  // Descriptions for each validity option
  const validityDescriptions: Record<string, string> = {
    "day": "Order valid only for the current trading day.",
    "gtc": "Order remains active until executed or canceled.",
    "gtd": "Order remains active until the specified date or execution.",
    "ioc": "Order must be executed immediately, or the unfilled portion is canceled.",
    "fok": "Order must be executed in its entirety immediately or canceled completely.",
    "aon": "Order must be executed in its entirety or not at all."
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Order Execution</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card 
            className={`p-4 cursor-pointer transition-all ${orderExecutionType === 'market' ? 'ring-2 ring-black bg-white' : 'bg-white hover:bg-gray-50'}`}
            onClick={() => setOrderExecutionType('market')}
          >
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <TrendingUp className={`h-5 w-5 text-green-600 ${orderExecutionType === "market" ? "text-green-600" : "text-gray-600"}`} />
              </div>
              <h3 className="font-medium text-center mb-2">Market</h3>
              <p className="text-sm text-gray-600 text-center">
                Execute at the current market price.
              </p>
            </div>
          </Card>
          
          <Card 
            className={`p-4 cursor-pointer transition-all ${orderExecutionType === 'limit' ? 'ring-2 ring-black bg-white' : 'bg-white hover:bg-gray-50'}`}
            onClick={() => setOrderExecutionType('limit')}
          >
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <Timer className={`h-5 w-5 ${orderExecutionType === "limit" ? "text-blue-600" : "text-gray-600"}`} />
              </div>
              <h3 className="font-medium text-center mb-2">Limit</h3>
              <p className="text-sm text-gray-600 text-center">
                Execute at a specified price or better.
              </p>
            </div>
          </Card>
          
          <Card 
            className={`p-4 cursor-pointer transition-all ${orderExecutionType === 'stop' ? 'ring-2 ring-black bg-white' : 'bg-white hover:bg-gray-50'}`}
            onClick={() => setOrderExecutionType('stop')}
          >
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <StopCircle className={`h-5 w-5 ${orderExecutionType === "stop" ? "text-amber-600" : "text-gray-600"}`} />
              </div>
              <h3 className="font-medium text-center mb-2">Stop</h3>
              <p className="text-sm text-gray-600 text-center">
                Triggers when price reaches stop level.
              </p>
            </div>
          </Card>
        </div>
      </div>

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
          <div className="pt-2">
            <Label htmlFor="date" className="block text-sm font-medium mb-2">
              Select Expiry Date
            </Label>
            <Popover>
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
