import React from "react";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, parse } from "date-fns";

interface DateFieldProps {
  id?: string;
  label: string;
  value?: string | Date;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
}

const DateField = ({
  id,
  label,
  value,
  onChange,
  placeholder = "Select a date",
  required = false,
  error,
  className,
  icon
}: DateFieldProps) => {
  const parseDate = (dateValue: string | Date | undefined): Date | undefined => {
    if (!dateValue) return undefined;
    if (dateValue instanceof Date) return dateValue;
    
    try {
      const date = new Date(dateValue);
      return isNaN(date.getTime()) ? undefined : date;
    } catch (e) {
      return undefined;
    }
  };

  const date = parseDate(value);

  const handleDateChange = (newDate?: Date) => {
    if (!newDate) {
      onChange("");
      return;
    }
    
    const formatted = newDate.toISOString().split('T')[0];
    onChange(formatted);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full h-11 justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-red-500"
            )}
          >
            {icon || <CalendarIcon className="mr-2 h-4 w-4" />}
            {date ? format(date, "PPP") : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
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
