
import React, { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  
  const handleSelectChange = (newValue: string) => {
    onChange(name, newValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-pointer"
          onClick={() => setOpen(true)}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <span className="text-left truncate">
            {value ? value : placeholder || `Select ${label.toLowerCase()}`}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent 
        className="w-full p-0 z-50 bg-white"
        align="start" 
        sideOffset={4}
        avoidCollisions={true}
      >
        <Command>
          <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
          <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-72">
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => handleSelectChange(option)}
                  className="cursor-pointer"
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
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchableSelectRenderer;
