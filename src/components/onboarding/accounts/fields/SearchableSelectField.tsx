
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
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
          <div
            id={id}
            className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-pointer"
            onClick={() => setOpen(true)}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
          >
            <span className="text-left truncate">
              {value || placeholder}
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="w-full p-0 z-50 bg-white" 
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
                    className="cursor-pointer"
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
