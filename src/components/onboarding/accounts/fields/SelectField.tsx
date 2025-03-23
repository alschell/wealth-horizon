
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  onChange: (value: string) => void;
}

const SelectField = ({
  id,
  label,
  value,
  placeholder,
  options,
  required = false,
  onChange
}: SelectFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}{required && <span className="text-red-500">*</span>}
      </Label>
      <Select
        value={value || ""}
        onValueChange={onChange}
      >
        <SelectTrigger 
          id={id} 
          className="h-11 w-full bg-white"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          className="bg-white border shadow-md z-50"
          sideOffset={8}
          align="start"
        >
          {options.map((option) => (
            <SelectItem 
              key={option} 
              value={option}
              className="hover:bg-slate-100 cursor-pointer"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;
