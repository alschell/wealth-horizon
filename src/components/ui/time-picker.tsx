
import * as React from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  label?: string;
  className?: string;
  id?: string;
}

export function TimePicker({ 
  value,
  onChange,
  label,
  className,
  id
}: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => 
    i.toString().padStart(2, '0')
  );
  
  const minutes = ['00', '15', '30', '45'];
  
  const [open, setOpen] = React.useState(false);
  
  const handleSelectTime = (hour: string, minute: string) => {
    onChange(`${hour}:${minute}`);
    setOpen(false);
  };
  
  const [hour, minute] = value ? value.split(':') : ['09', '00'];

  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full h-11 justify-start text-left font-normal bg-white border-gray-300 hover:bg-gray-50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:border-black",
              open ? "border-black ring-2 ring-black" : "border-gray-300",
              !value && "text-muted-foreground"
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {value ? `${hour}:${minute}` : "Select time"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 grid grid-cols-2 gap-4 w-[280px]">
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">Hour</Label>
              <div className="h-[180px] overflow-y-auto pr-2 flex flex-col border rounded-md">
                {hours.map((h) => (
                  <Button
                    key={h}
                    variant="ghost"
                    className={cn(
                      "justify-start font-normal rounded-none",
                      hour === h ? "bg-black text-white hover:bg-black hover:text-white" : ""
                    )}
                    onClick={() => handleSelectTime(h, minute)}
                  >
                    {h}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">Minute</Label>
              <div className="space-y-1">
                {minutes.map((m) => (
                  <Button
                    key={m}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-normal",
                      minute === m ? "bg-black text-white hover:bg-black hover:text-white" : ""
                    )}
                    onClick={() => handleSelectTime(hour, m)}
                  >
                    {m}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
