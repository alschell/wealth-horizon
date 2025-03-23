
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectFieldRendererProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  options: string[];
}

const SelectFieldRenderer: React.FC<SelectFieldRendererProps> = ({
  name,
  value,
  onChange,
  placeholder,
  options,
}) => {
  const handleSelectChange = (newValue: string) => {
    onChange(name, newValue);
  };

  return (
    <Select value={value} onValueChange={handleSelectChange}>
      <SelectTrigger className="h-11 w-full bg-white">
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
  );
};

export default SelectFieldRenderer;
