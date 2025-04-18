
import React, { useState, useEffect, useRef } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CustomSearchableSelectProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
  allowCustomValue?: boolean;
  className?: string;
  error?: string;
  disabled?: boolean;
}

const CustomSearchableSelect = ({
  id,
  label,
  value,
  placeholder,
  options,
  onChange,
  required = false,
  allowCustomValue = false,
  className,
  error,
  disabled = false,
}: CustomSearchableSelectProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = `${id}-list`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Ensure options is always an array
  const safeOptions = Array.isArray(options) ? options : [];

  // This function keeps options in original order, no sorting
  const getFilteredOptions = () => {
    let filtered = safeOptions.filter((option) =>
      option.toLowerCase().includes(query.toLowerCase())
    );
    
    if (allowCustomValue && query && !safeOptions.includes(query) && !filtered.includes(query)) {
      filtered = [query, ...filtered];
    }

    return filtered;
  };

  const filteredOptions = getFilteredOptions();

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (!open) {
          event.preventDefault();
          setOpen(true);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setOpen(false);
        break;
    }
  };

  return (
    <div className={cn("relative", className)}>
      {label && (
        <Label htmlFor={id} className="text-black">
          {label}
          {required && <span className="text-indigo-600 ml-1" aria-hidden="true">*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            disabled={disabled}
            onKeyDown={handleKeyDown}
            className={cn(
              "h-11 w-full justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-left",
              open ? "border-black border-2" : "border",
              !value && "text-muted-foreground",
              error ? "border-red-500" : "",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            aria-describedby={error ? `${id}-error` : undefined}
          >
            {value ? (
              <span className="text-left">{value}</span>
            ) : (
              <span className="text-muted-foreground text-left">{placeholder}</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 z-[999]" align="start">
          <Command>
            <CommandInput
              placeholder={placeholder}
              value={query}
              onValueChange={setQuery}
              ref={inputRef}
              className="h-11"
              aria-label={`Search ${label}`}
            />
            <CommandList id={listId} className="max-h-48 overflow-auto bg-white border border-gray-200 rounded-md shadow-md">
              <CommandEmpty>No results found</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={(value) => {
                      onChange(value);
                      setOpen(false);
                    }}
                    className="cursor-pointer hover:bg-gray-100 text-left"
                    aria-selected={value === option}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option ? "opacity-100" : "opacity-0"
                      )}
                      aria-hidden="true"
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
        <p className="text-sm text-red-500 mt-1" id={`${id}-error`} aria-live="polite">{error}</p>
      )}
    </div>
  );
};

export default CustomSearchableSelect;
