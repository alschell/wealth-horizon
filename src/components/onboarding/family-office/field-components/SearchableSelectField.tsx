
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
  onChange: (value: string) => void;
  placeholder?: string;
  options: string[];
  required?: boolean;
  allowCustomValue?: boolean;
}

const SearchableSelectField: React.FC<SearchableSelectFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  options,
  required = false,
  allowCustomValue = false
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Sort options alphabetically
  const sortedOptions = [...options].sort((a, b) => a.localeCompare(b));

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setOpen(false);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (allowCustomValue && e.key === "Enter" && inputValue && !options.includes(inputValue)) {
      e.preventDefault();
      onChange(inputValue);
      setOpen(false);
      setInputValue("");
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id}>
          {label}{required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label={`Select ${label || 'option'}`}
            className="h-11 w-full justify-between text-left font-normal bg-white border"
            type="button"
          >
            {value ? (
              <span className="truncate">{value}</span>
            ) : (
              <span className="truncate text-muted-foreground">{placeholder || "Select option"}</span>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2 text-[#86CEFA]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border shadow-md z-[999]" 
          align="start"
          side="bottom"
          sideOffset={8}
          avoidCollisions={true}
        >
          <Command className="bg-white">
            <CommandInput 
              placeholder={`Search ${label ? label.toLowerCase() : 'options'}...`} 
              className="h-9"
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={handleKeyDown}
            />
            <CommandEmpty>
              {allowCustomValue ? (
                <div className="py-3 px-4 text-sm">
                  <p>No results found.</p>
                  <p className="font-medium text-[#86CEFA]">Press Enter to add "{inputValue}"</p>
                </div>
              ) : (
                "No results found."
              )}
            </CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {sortedOptions.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => handleSelect(option)}
                  className="hover:bg-slate-100 aria-selected:bg-slate-100 cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-[#86CEFA]",
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
    </div>
  );
};

export default SearchableSelectField;
