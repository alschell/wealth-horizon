
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
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
          type="button"
        >
          {value ? (
            <span className="truncate text-left">{value}</span>
          ) : (
            <span className="truncate text-left text-muted-foreground">
              {placeholder || `Select ${label.toLowerCase()}`}
            </span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[var(--radix-popover-trigger-width)] p-0 bg-white border shadow-md z-[100]"
        align="start"
        side="bottom" 
        sideOffset={8}
        avoidCollisions={true}
      >
        <Command className="bg-white">
          <CommandInput placeholder={`Search ${label.toLowerCase()}...`} className="h-9" />
          <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
          <CommandGroup className="bg-white max-h-[300px] overflow-y-auto">
            {options.map((option) => (
              <CommandItem
                key={option}
                value={option}
                onSelect={() => handleSelectChange(option)}
                className="hover:bg-slate-100 aria-selected:bg-slate-100 cursor-pointer"
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
