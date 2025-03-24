
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
  extractValue?: (option: string) => string;
}

const SearchableSelectField: React.FC<SearchableSelectFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  options,
  required = false,
  extractValue = (option) => option
}) => {
  const [open, setOpen] = useState(false);

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
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border shadow-md z-50" 
          align="start"
          side="bottom"
          sideOffset={8}
          avoidCollisions={false}
        >
          <Command className="bg-white">
            <CommandInput placeholder={`Search ${label ? label.toLowerCase() : 'options'}...`} className="h-9" />
            <CommandEmpty>No results found.</CommandEmpty>
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
                    className="hover:bg-slate-100 aria-selected:bg-slate-100 cursor-pointer"
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
