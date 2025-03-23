
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
        {label}{required && "*"}
      </Label>
      <Select
        value={value || ""}
        onValueChange={onChange}
      >
        <SelectTrigger className="h-11 w-full bg-white" id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          className="max-h-[300px] overflow-y-auto z-50 bg-white"
          sideOffset={4}
          avoidCollisions={true}
        >
          {options.map((option) => (
            <SelectItem key={option} value={option} className="cursor-pointer">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;
