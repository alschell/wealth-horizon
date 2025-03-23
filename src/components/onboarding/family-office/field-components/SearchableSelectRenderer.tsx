
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchableSelectRendererProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  options: string[];
  label: string;
}

const SearchableSelectRenderer: React.FC<SearchableSelectRendererProps> = ({
  name,
  value,
  onChange,
  placeholder,
  options,
  label,
}) => {
  const [open, setOpen] = useState(false);
  
  const handleSelectChange = (selectedValue: string) => {
    onChange(name, selectedValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={`Select ${label}`}
          className="h-11 w-full justify-between bg-white border font-normal"
          type="button"
        >
          <span className="truncate text-left">
            {value ? value : placeholder || `Select ${label.toLowerCase()}`}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
            {options.map((option) => (
              <CommandItem
                key={option}
                value={option}
                onSelect={() => handleSelectChange(option)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option ? "opacity-100" : "opacity-0"
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchableSelectRenderer;
