
import React, { useState } from "react";
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
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchableSelectRendererProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  options: string[];
  label?: string;
  allowCustomValue?: boolean;
}

const SearchableSelectRenderer: React.FC<SearchableSelectRendererProps> = ({
  name,
  value,
  onChange,
  placeholder,
  options,
  label,
  allowCustomValue = false
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  // Ensure options is always an array
  const safeOptions = Array.isArray(options) ? options : [];
  
  // Sort options alphabetically, but ensure "Other" is at the end
  let sortedOptions = [...safeOptions];
  if (sortedOptions.includes("Other")) {
    sortedOptions = sortedOptions
      .filter(option => option !== "Other")
      .sort((a, b) => a.localeCompare(b));
    sortedOptions.push("Other");
  } else {
    sortedOptions.sort((a, b) => a.localeCompare(b));
  }

  const handleSelect = (currentValue: string) => {
    onChange(name, currentValue);
    setOpen(false);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (allowCustomValue && e.key === "Enter" && inputValue && !safeOptions.includes(inputValue)) {
      e.preventDefault();
      onChange(name, inputValue);
      setOpen(false);
      setInputValue("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-11 bg-white border-input hover:bg-slate-50 text-black text-left"
        >
          {value ? (
            <span className="text-left">{value}</span>
          ) : (
            <span className="text-left text-muted-foreground">{placeholder || `Select ${label || 'option'}`}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 z-[999]" align="start">
        <Command onKeyDown={handleKeyDown}>
          <CommandInput 
            placeholder={`Search ${label || 'options'}...`} 
            value={inputValue}
            onValueChange={handleInputChange}
            className="text-black"
          />
          <CommandList>
            <CommandEmpty>
              {allowCustomValue ? (
                <div className="py-3 px-4 text-sm">
                  <p className="text-black">No results found.</p>
                  <p className="font-medium text-black">Press Enter to add "{inputValue}"</p>
                </div>
              ) : (
                <span className="text-black">`No ${label || 'option'} found.`</span>
              )}
            </CommandEmpty>
            <CommandGroup>
              {sortedOptions.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={handleSelect}
                  className="cursor-pointer text-black text-left"
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
  );
};

export default SearchableSelectRenderer;
