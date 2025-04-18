
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/enhanced-components"

interface DatePickerProps {
  id?: string;
  value?: Date;
  onChange?: (date?: Date) => void;
  label: string;
  placeholder?: string;
  optional?: boolean;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({ 
  id,
  value, 
  onChange, 
  label, 
  placeholder,
  optional = false,
  disabled = false,
  className 
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (date?: Date) => {
    onChange?.(date);
    setOpen(false); // Close the popover after selection
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={"outline"}
            disabled={disabled}
            className={cn(
              "w-full h-11 justify-start text-left font-normal bg-white border-gray-300 hover:bg-gray-50",
              !value && "text-muted-foreground",
              open ? "border-black ring-2 ring-black" : ""
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-black" />
            {value ? format(value, "PPP") : <span>{placeholder || label}</span>}
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
            onSelect={handleSelect}
            initialFocus
            className="rounded-md border shadow-md bg-white pointer-events-auto"
            weekStartsOn={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
