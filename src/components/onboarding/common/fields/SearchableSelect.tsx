
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchableSelectProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
  className?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  id,
  label,
  value,
  placeholder,
  options,
  required = false,
  error,
  onChange,
  className
}) => {
  const [open, setOpen] = useState(false);
  
  // Ensure options is always an array
  const safeOptions = Array.isArray(options) ? options : [];

  // Sort options alphabetically
  const sortedOptions = [...safeOptions].sort((a, b) => a.localeCompare(b));

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setOpen(false);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-black">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label={`Select ${label}`}
            className={cn(
              "h-11 w-full justify-between text-left font-normal bg-white border text-black",
              error ? "border-red-500" : ""
            )}
            type="button"
          >
            {value ? (
              <span className="truncate text-black text-left">{value}</span>
            ) : (
              <span className="truncate text-gray-500 text-left">{placeholder}</span>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2 text-black" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border shadow-md z-[999]" 
          align="start"
          side="bottom"
          sideOffset={8}
          avoidCollisions={true}
        >
          <Command>
            <CommandInput 
              placeholder={`Search ${label.toLowerCase()}...`} 
              className="h-9 text-black"
            />
            <CommandList>
              <CommandEmpty>
                <span className="text-black">No results found.</span>
              </CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-y-auto">
                {sortedOptions.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => handleSelect(option)}
                    className="hover:bg-slate-100 aria-selected:bg-slate-100 cursor-pointer text-black text-left"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-black",
                        value === option ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default SearchableSelect;
