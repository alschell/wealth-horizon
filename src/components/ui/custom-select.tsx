
import React, { useState, useRef, useEffect } from "react";
import { Label } from "./label";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomSelectProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  onChange: (value: string) => void;
  className?: string;
}

const CustomSelect = ({
  id,
  label,
  value,
  placeholder,
  options,
  required = false,
  onChange,
  className,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Sort options alphabetically, but ensure "Other" is at the end
  let sortedOptions = [...options];
  if (sortedOptions.includes("Other")) {
    sortedOptions = sortedOptions
      .filter(option => option !== "Other")
      .sort((a, b) => a.localeCompare(b));
    sortedOptions.push("Other");
  } else {
    sortedOptions.sort((a, b) => a.localeCompare(b));
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div ref={selectRef} className="relative">
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-between w-full h-11 px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-black focus:border-black",
            isOpen ? "border-black ring-2 ring-black" : "",
            "hover:bg-gray-50"
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {value ? (
            <span className="block truncate text-left">{value}</span>
          ) : (
            <span className="block truncate text-gray-500 text-left">{placeholder}</span>
          )}
          <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
        </button>
        
        {isOpen && (
          <div 
            className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
            style={{ marginTop: '4px' }}
          >
            <ul className="py-1" role="listbox">
              {sortedOptions.map((option) => (
                <li
                  key={option}
                  role="option"
                  className={cn(
                    "cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-blue-50 text-left",
                    value === option ? "bg-blue-50" : ""
                  )}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  aria-selected={value === option}
                >
                  <span className="block truncate text-left">{option}</span>
                  {value === option && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Check className="w-4 h-4 text-blue-600" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export { CustomSelect };
