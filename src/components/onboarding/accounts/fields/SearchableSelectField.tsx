
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

interface SearchableSelectFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
  allowCustomValue?: boolean;
  className?: string;
  disabled?: boolean;
}

const SearchableSelectField = ({
  id,
  label,
  value,
  placeholder,
  options,
  required = false,
  error,
  onChange,
  allowCustomValue = false,
  className,
  disabled = false
}: SearchableSelectFieldProps) => {
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

  // This function immediately applies the selected value and closes the dropdown
  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setOpen(false);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (allowCustomValue && e.key === "Enter" && inputValue && !safeOptions.includes(inputValue)) {
      e.preventDefault();
      onChange(inputValue);
      setOpen(false);
      setInputValue("");
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={id} className="text-black">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label={`Select ${label}`}
            className={cn(
              "h-11 w-full justify-between text-left font-normal bg-white border border-input text-black",
              error ? "border-red-500" : "",
              disabled ? "opacity-70 cursor-not-allowed" : ""
            )}
            type="button"
            disabled={disabled}
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
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border shadow-md" 
          align="start"
          sideOffset={8}
          avoidCollisions={true}
          style={{ zIndex: 100 }}
        >
          <Command onKeyDown={handleKeyDown}>
            <CommandInput 
              placeholder={`Search ${label ? label.toLowerCase() : 'options'}...`} 
              className="h-9 text-black"
              value={inputValue}
              onValueChange={setInputValue}
              autoFocus
            />
            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandEmpty>
                {allowCustomValue ? (
                  <div className="py-3 px-4 text-sm">
                    <p className="text-black">No results found.</p>
                    <p className="font-medium text-black">Press Enter to add "{inputValue}"</p>
                  </div>
                ) : (
                  <span className="text-black">No results found.</span>
                )}
              </CommandEmpty>
              <CommandGroup>
                {sortedOptions.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => handleSelect(option)}
                    className="hover:bg-slate-100 cursor-pointer text-black"
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

export default SearchableSelectField;
