
import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateFieldProps {
  value?: Date;
  onChange: (date?: Date) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
  id?: string; // Add id as optional prop but don't pass it to DatePicker
}

const DateField = ({
  value,
  onChange,
  placeholder = "Select date",
  label,
  required = false,
  error,
  className,
  id // Add id to the destructured props but don't use it in DatePicker
}: DateFieldProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-2">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </div>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full h-11 justify-start text-left font-normal bg-white border-gray-300 hover:bg-gray-50 focus-visible:ring-black",
              !value && "text-muted-foreground",
              error && "border-red-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-black" />
            {value ? format(value, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-white shadow-lg rounded-md border z-[999]" 
          align="start" 
          avoidCollisions={true}
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            initialFocus
            className="rounded-md border shadow-md bg-white pointer-events-auto"
            weekStartsOn={1} // 1 for Monday (0 is Sunday, 1 is Monday, etc.)
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
