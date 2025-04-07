
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
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

interface DatePickerProps {
  id?: string;
  value?: Date;
  onChange?: (date?: Date) => void;
  label: string;
  placeholder?: string;
  optional?: boolean;
  disabled?: boolean;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  focused?: boolean; // New prop to control focus state externally
}

export function DatePicker({ 
  id,
  value, 
  onChange, 
  label, 
  placeholder = "Select date", 
  optional = false,
  disabled = false,
  className,
  onFocus,
  onBlur,
  focused: externalFocused
}: DatePickerProps) {
  // Use external focused state if provided, otherwise manage internally
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = externalFocused !== undefined ? externalFocused : internalOpen;
  
  const handleOpenChange = (isOpen: boolean) => {
    if (externalFocused === undefined) {
      setInternalOpen(isOpen);
    }
    
    if (isOpen) {
      onFocus?.();
    } else {
      onBlur?.();
    }
  };

  const handleSelect = (date?: Date) => {
    onChange?.(date);
    // Always close the popover after selection
    handleOpenChange(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Label className="text-black">
        {label}
        {!optional && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={"outline"}
            disabled={disabled}
            className={cn(
              "w-full h-11 justify-start text-left font-normal bg-white border-gray-300 hover:bg-gray-50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:border-black",
              // Only show the focus ring when open, not when a date is selected
              open ? "border-black ring-2 ring-black" : "border-gray-300",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-black" />
            {value ? format(value, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-white shadow-lg rounded-md border z-[100]" 
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
