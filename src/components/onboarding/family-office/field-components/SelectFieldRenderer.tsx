
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

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
      <SelectTrigger 
        id={`select-${name}`}
        className="h-11 w-full bg-white"
      >
        <SelectValue placeholder={placeholder || `Select option`} />
      </SelectTrigger>
      <SelectContent 
        className="bg-white z-50"
        position="popper" 
        sideOffset={4}
      >
        {options.map((option) => (
          <SelectItem 
            key={option} 
            value={option}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFieldRenderer;
