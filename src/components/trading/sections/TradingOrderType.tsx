
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Order Execution</h3>
        
        <RadioGroup
          value={orderExecutionType}
          onValueChange={setOrderExecutionType}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div>
            <RadioGroupItem
              value="market"
              id="market"
              className="peer sr-only"
            />
            <Label
              htmlFor="market"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-black [&:has([data-state=checked])]:border-black"
            >
              <span className="font-medium">Market</span>
              <span className="text-xs text-gray-500 mt-1 text-center">
                Execute immediately at current price
              </span>
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="limit"
              id="limit"
              className="peer sr-only"
            />
            <Label
              htmlFor="limit"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-black [&:has([data-state=checked])]:border-black"
            >
              <span className="font-medium">Limit</span>
              <span className="text-xs text-gray-500 mt-1 text-center">
                Execute at specified price or better
              </span>
            </Label>
          </div>

          <div>
            <RadioGroupItem
              value="stop"
              id="stop"
              className="peer sr-only"
            />
            <Label
              htmlFor="stop"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-black [&:has([data-state=checked])]:border-black"
            >
              <span className="font-medium">Stop</span>
              <span className="text-xs text-gray-500 mt-1 text-center">
                Execute when price reaches stop level
              </span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Validity</h3>
        
        <RadioGroup
          value={timeInForce}
          onValueChange={setTimeInForce}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div>
            <RadioGroupItem
              value="day"
              id="day"
              className="peer sr-only"
            />
            <Label
              htmlFor="day"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-black [&:has([data-state=checked])]:border-black"
            >
              <span className="font-medium">Day Only</span>
              <span className="text-xs text-gray-500 mt-1 text-center">
                Valid for the current trading day
              </span>
            </Label>
          </div>
          
          <div>
            <RadioGroupItem
              value="gtc"
              id="gtc"
              className="peer sr-only"
            />
            <Label
              htmlFor="gtc"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-black [&:has([data-state=checked])]:border-black"
            >
              <span className="font-medium">Good Till Canceled</span>
              <span className="text-xs text-gray-500 mt-1 text-center">
                Valid until canceled
              </span>
            </Label>
          </div>
          
          <div>
            <RadioGroupItem
              value="gtd"
              id="gtd"
              className="peer sr-only"
            />
            <Label
              htmlFor="gtd"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-black [&:has([data-state=checked])]:border-black"
            >
              <span className="font-medium">Good Till Date</span>
              <span className="text-xs text-gray-500 mt-1 text-center">
                Valid until specified date
              </span>
            </Label>
          </div>
        </RadioGroup>
        
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
