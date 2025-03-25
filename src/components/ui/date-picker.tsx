
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
}

export function DatePicker({ 
  id,
  value, 
  onChange, 
  label, 
  placeholder = "Select date", 
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
      <Label className="text-black">
        {label}
        {!optional && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={"outline"}
            disabled={disabled}
            className={cn(
              "w-full h-11 justify-start text-left font-normal bg-white border-gray-300 hover:bg-gray-50 focus-visible:ring-black",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-black" />
            {value ? format(value, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-white shadow-lg rounded-md border" 
          align="start" 
          avoidCollisions={true}
          style={{ zIndex: 100 }}
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            initialFocus
            className="rounded-md border shadow-md bg-white pointer-events-auto"
            weekStartsOn={1} // 1 for Monday (0 is Sunday, 1 is Monday, etc.)
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
