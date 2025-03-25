
import React from "react";
import { SearchableSelectField as CommonSearchableSelectField } from "@/components/onboarding/common/fields";

interface SearchableSelectFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
  extractValue?: (option: string) => string;
  allowCustomValue?: boolean;
  disabled?: boolean;
}

const SearchableSelectField = ({
  id,
  label,
  value,
  placeholder,
  options,
  required = false,
  error,
  onChange,
  allowCustomValue = false,
  disabled = false
}: SearchableSelectFieldProps) => {
  return (
    <CommonSearchableSelectField
      id={id}
      label={label}
      value={value}
      placeholder={placeholder}
      options={options}
      required={required}
      error={error}
      onChange={onChange}
      allowCustomValue={allowCustomValue}
      disabled={disabled}
    />
  );
};

export default SearchableSelectField;
