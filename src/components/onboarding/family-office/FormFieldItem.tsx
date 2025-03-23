
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePicker } from "@/components/DatePicker";

interface FormFieldItemProps {
  index: number;
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "number" | "select" | "searchableSelect" | "date";
  required?: boolean;
  options?: string[];
  minValue?: number;
  maxValue?: number;
  className?: string; // Add className prop to the interface
}

export const formItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

const FormFieldItem: React.FC<FormFieldItemProps> = ({
  index,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  options = [],
  minValue,
  maxValue,
  className, // Include className in function parameters
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  const handleSelectChange = (newValue: string) => {
    onChange(name, newValue);
  };

  const handleDateChange = (date?: Date) => {
    if (date) {
      onChange(name, date.toISOString());
    }
  };

  const renderField = () => {
    switch (type) {
      case "select":
        return (
          <Select value={value} onValueChange={handleSelectChange}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case "searchableSelect":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                role="combobox"
              >
                {value ? value : placeholder || `Select ${label.toLowerCase()}`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
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

      case "number":
        return (
          <Input
            id={name}
            name={name}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="h-11"
            type="number"
            min={minValue}
            max={maxValue}
          />
        );
      
      case "date":
        return (
          <DatePicker
            value={value ? new Date(value) : undefined}
            onChange={handleDateChange}
            label={placeholder || `Select ${label.toLowerCase()}`}
            optional={!required}
          />
        );

      default:
        return (
          <Input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="h-11"
          />
        );
    }
  };

  return (
    <motion.div
      custom={index}
      variants={formItemVariants}
      initial="hidden"
      animate="visible"
      className={cn("space-y-2", className)} // Apply className to the container
    >
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderField()}
    </motion.div>
  );
};

export default FormFieldItem;
