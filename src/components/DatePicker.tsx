
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

interface DatePickerProps {
  value?: Date
  onChange?: (date?: Date) => void
  label: string
  optional?: boolean
}

export function DatePicker({ value, onChange, label, optional }: DatePickerProps) {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full h-11 justify-start text-left font-normal bg-white border-gray-300 hover:bg-gray-50 focus-visible:ring-black",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-black" />
            {value ? format(value, "PPP") : <span>{label}</span>}
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
            onSelect={onChange}
            initialFocus
            className="rounded-md border shadow-md bg-white pointer-events-auto"
            weekStartsOn={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
