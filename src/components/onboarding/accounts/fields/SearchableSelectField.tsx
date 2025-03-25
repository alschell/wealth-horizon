
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
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
  disabled = false
}: SearchableSelectFieldProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  // Sort options alphabetically, but ensure "Other" is at the end
  let sortedOptions = [...options];
  if (sortedOptions.includes("Other")) {
    sortedOptions = sortedOptions
      .filter(option => option !== "Other")
      .sort((a, b) => a.localeCompare(b));
    sortedOptions.push("Other");
  } else {
    sortedOptions.sort((a, b) => a.localeCompare(b));
  }

  const handleSelect = (currentValue: string) => {
    onChange(currentValue);
    setOpen(false);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "w-full justify-between h-11 bg-white border-input hover:bg-slate-50 text-black text-left",
              error ? "border-red-500" : "",
              disabled ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            {value ? (
              <span className="text-left truncate">{value}</span>
            ) : (
              <span className="text-left text-muted-foreground">{placeholder}</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-black" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0" 
          align="start"
          sideOffset={8}
          style={{ zIndex: 999 }}
        >
          <Command onKeyDown={handleKeyDown}>
            <CommandInput 
              placeholder={`Search ${label.toLowerCase()}...`} 
              value={inputValue}
              onValueChange={handleInputChange}
              className="text-black h-9"
            />
            <CommandList className="max-h-[200px] overflow-auto">
              <CommandEmpty>
                {allowCustomValue ? (
                  <div className="py-3 px-4 text-sm">
                    <p className="text-black">No results found.</p>
                    <p className="font-medium text-black">Press Enter to add "{inputValue}"</p>
                  </div>
                ) : (
                  <span className="py-3 px-4 text-sm text-black">No {label.toLowerCase()} found.</span>
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
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default SearchableSelectField;
