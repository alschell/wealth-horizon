
import React, { useState } from "react";
import { Search } from "lucide-react";
import type { Currency } from "@/utils/constants/currencies";

interface SearchableSelectFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[] | Currency[];
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  allowCustomValue?: boolean;
  className?: string;
  disabled?: boolean; // Added disabled prop
}

const SearchableSelectField: React.FC<SearchableSelectFieldProps> = ({
  id,
  label,
  value,
  placeholder,
  options,
  onChange,
  required = false,
  error,
  allowCustomValue = false,
  className = "",
  disabled = false, // Added with default value
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Get display value based on the current value
  const getDisplayValue = () => {
    if (!value) return "";

    // Check if options is Currency[] or string[]
    if (options.length > 0 && typeof options[0] !== "string") {
      const currencyOptions = options as Currency[];
      const selectedCurrency = currencyOptions.find((option) => option.code === value || option.name === value);
      return selectedCurrency ? `${selectedCurrency.code} - ${selectedCurrency.name}` : value;
    }
    
    return value;
  };

  const filteredOptions = options.filter((option) => {
    const searchTermLower = searchTerm.toLowerCase();
    
    if (typeof option === "string") {
      return option.toLowerCase().includes(searchTermLower);
    } else {
      const currencyOption = option as Currency;
      return (
        currencyOption.code.toLowerCase().includes(searchTermLower) ||
        currencyOption.name.toLowerCase().includes(searchTermLower)
      );
    }
  });

  const handleOptionClick = (option: string | Currency) => {
    let selectedValue: string;
    
    if (typeof option === "string") {
      selectedValue = option;
    } else {
      selectedValue = option.code;
    }
    
    onChange(selectedValue);
    setSearchTerm("");
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (allowCustomValue) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        
        <input
          type="text"
          id={id}
          className={`pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"} ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          placeholder={placeholder}
          value={isOpen ? searchTerm : getDisplayValue()}
          onChange={handleInputChange}
          onFocus={() => !disabled && setIsOpen(true)}
          onBlur={() => {
            // Delay closing to allow for option selection
            setTimeout(() => setIsOpen(false), 200);
          }}
          disabled={disabled}
        />
      </div>
      
      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            <ul className="py-1">
              {filteredOptions.map((option, index) => {
                let displayText: string;
                let optionValue: string;
                
                if (typeof option === "string") {
                  displayText = option;
                  optionValue = option;
                } else {
                  const currencyOption = option as Currency;
                  displayText = `${currencyOption.code} - ${currencyOption.name}`;
                  optionValue = currencyOption.code;
                }
                
                return (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => handleOptionClick(option)}
                  >
                    {displayText}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
      
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default SearchableSelectField;
