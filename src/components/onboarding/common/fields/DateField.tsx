
import React from "react";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface DateFieldProps {
  label: string;
  value?: Date;
  onChange: (date?: Date) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const DateField = ({
  label,
  value,
  onChange,
  placeholder = "Select a date",
  required = false,
  error,
  className
}: DateFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full h-11 justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-red-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default DateField;
