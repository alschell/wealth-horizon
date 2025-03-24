import React, { useState, useEffect, useRef } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandTrigger } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomSearchableSelectProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
  required?: boolean;
  allowCustomValue?: boolean;
}

const CustomSearchableSelect: React.FC<CustomSearchableSelectProps> = ({
  id,
  label,
  value,
  placeholder,
  options,
  onChange,
  required = false,
  allowCustomValue = false,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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

  const filteredOptions = React.useMemo(() => {
    let filtered = options.filter((option) =>
      option.toLowerCase().includes(query.toLowerCase())
    );
    
    if (allowCustomValue && query && !options.includes(query) && !filtered.includes(query)) {
      filtered = [query, ...filtered];
    }

    return filtered;
  }, [query, options, allowCustomValue]);

  return (
    <div className="relative">
      <Label htmlFor={id} className="text-black">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <CommandTrigger
            className={cn(
              "flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              open && "border-black",
              !value && "text-muted-foreground"
            )}
          >
            {value ? (
              value
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </CommandTrigger>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder={placeholder}
              value={query}
              onValueChange={setQuery}
              ref={inputRef}
              className="h-11"
            />
            <CommandList className="max-h-48 overflow-auto bg-white border border-gray-200 rounded-md shadow-md z-[999]">
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
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomSearchableSelect;
