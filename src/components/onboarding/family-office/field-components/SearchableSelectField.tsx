
import React from "react";
import SearchableSelectRenderer from "./SearchableSelectRenderer";

interface SearchableSelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: string[];
  required?: boolean;
}

const SearchableSelectField: React.FC<SearchableSelectFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  options,
  required = false,
}) => {
  const handleChange = (name: string, selectedValue: string) => {
    onChange(selectedValue);
  };

  return (
    <SearchableSelectRenderer
      name={id}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      options={options}
      label={label}
    />
  );
};

export default SearchableSelectField;
