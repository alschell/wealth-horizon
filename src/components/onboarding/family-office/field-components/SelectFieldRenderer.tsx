
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
  // Sort options alphabetically
  const sortedOptions = [...options].sort((a, b) => a.localeCompare(b));
  
  const handleSelectChange = (newValue: string) => {
    onChange(name, newValue);
  };

  return (
    <Select value={value || ""} onValueChange={handleSelectChange}>
      <SelectTrigger 
        id={`select-${name}`}
        className="h-11 w-full bg-white"
      >
        <SelectValue placeholder={placeholder || `Select option`} />
      </SelectTrigger>
      <SelectContent 
        className="bg-white border shadow-lg z-[999]"
        position="popper" 
        sideOffset={8}
        avoidCollisions={true}
      >
        {sortedOptions.map((option) => (
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
  );
};

export default SelectFieldRenderer;
