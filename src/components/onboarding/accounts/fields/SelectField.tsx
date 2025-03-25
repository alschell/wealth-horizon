
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
  className?: string;
  name?: string;
}

const SelectField = ({
  id,
  label,
  value,
  placeholder,
  options,
  required = false,
  error,
  onChange,
  className,
  name
}: SelectFieldProps) => {
  // Ensure "Other" is at the end if present
  const sortedOptions = [...options].sort((a, b) => {
    if (a === "Other") return 1;
    if (b === "Other") return -1;
    return a.localeCompare(b);
  });
  
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select
        value={value || ""}
        onValueChange={onChange}
      >
        <SelectTrigger 
          id={id} 
          name={name || id}
          className={cn("h-11 w-full bg-white text-left", error ? "border-red-500" : "")}
        >
          <SelectValue placeholder={placeholder} className="text-left" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          className="bg-white border shadow-md z-[999] min-w-[var(--radix-select-trigger-width)]"
          sideOffset={8}
          align="start"
        >
          {sortedOptions.map((option) => (
            <SelectItem 
              key={option} 
              value={option}
              className="hover:bg-slate-100 cursor-pointer text-left"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default SelectField;
