
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
  allowCustomValue?: boolean;
}

const SearchableSelectField = ({
  id,
  label,
  value,
  placeholder,
  options,
  required = false,
  onChange,
  extractValue = (option) => option,
  allowCustomValue = false
}: SearchableSelectFieldProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Sort options alphabetically
  const sortedOptions = [...options].sort((a, b) => a.localeCompare(b));

  const handleSelect = (selectedValue: string) => {
    onChange(extractValue(selectedValue));
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
      <Label htmlFor={id}>
        {label}{required && <span className="text-red-500">*</span>}
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
            onClick={(e) => {
              e.preventDefault();
              setOpen(!open);
            }}
          >
            {value ? (
              <span className="truncate">{value}</span>
            ) : (
              <span className="truncate text-muted-foreground">{placeholder}</span>
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
              placeholder={`Search ${label.toLowerCase()}...`} 
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
              {sortedOptions.map((option) => {
                const optionValue = extractValue(option);
                return (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => handleSelect(option)}
                    className="hover:bg-slate-100 aria-selected:bg-slate-100 cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-[#86CEFA]",
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
