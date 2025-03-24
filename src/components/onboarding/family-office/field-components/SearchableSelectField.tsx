
import React from "react";
import { Label } from "@/components/ui/label";
import SearchableSelectRenderer from "./SearchableSelectRenderer";

interface SearchableSelectFieldProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  options: string[];
  label: string;
  required?: boolean;
}

const SearchableSelectField: React.FC<SearchableSelectFieldProps> = ({
  name,
  value,
  onChange,
  placeholder,
  options,
  label,
  required = false,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={`select-${name}`} className="font-medium">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <SearchableSelectRenderer
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        label={label}
      />
    </div>
  );
};

export default SearchableSelectField;
