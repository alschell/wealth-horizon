
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem 
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchableSelectFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  onChange: (value: string) => void;
  extractValue?: (option: string) => string;
}

const SearchableSelectField = ({
  id,
  label,
  value,
  placeholder,
  options,
  required = false,
  onChange,
  extractValue = (option) => option
}: SearchableSelectFieldProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}{required && "*"}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label={`Select ${label}`}
            className="h-11 w-full justify-between text-left font-normal bg-white border"
            type="button"
          >
            <span className="truncate">
              {value || placeholder}
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-full p-0 bg-white z-50" 
          align="start"
          sideOffset={4}
          avoidCollisions={true}
        >
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {options.map((option) => {
                const optionValue = extractValue(option);
                return (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => {
                      onChange(optionValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === optionValue ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchableSelectField;
