
import React, { useState, useRef, useEffect } from "react";
import { Label } from "./label";
import { ChevronDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomSearchableSelectProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  onChange: (value: string) => void;
  className?: string;
  allowCustomValue?: boolean;
}

const CustomSearchableSelect = ({
  id,
  label,
  value,
  placeholder,
  options,
  required = false,
  onChange,
  className,
  allowCustomValue = false
}: CustomSearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (allowCustomValue && e.key === "Enter" && searchTerm && !options.includes(searchTerm)) {
      e.preventDefault();
      onChange(searchTerm);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-black">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div ref={selectRef} className="relative">
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full h-11 px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {value ? (
            <span className="block truncate text-black">{value}</span>
          ) : (
            <span className="block truncate text-gray-500">{placeholder}</span>
          )}
          <ChevronDown className="w-4 h-4 ml-2 text-black" />
        </button>
        
        {isOpen && (
          <div 
            className="absolute z-[999] w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
            style={{ marginTop: '4px' }}
          >
            <div className="px-3 py-2 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full py-2 pl-8 pr-3 text-sm bg-transparent border-none focus:outline-none focus:ring-0 text-black"
                  placeholder={`Search ${label.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <ul 
              className="py-1 max-h-60 overflow-auto" 
              role="listbox"
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option}
                    role="option"
                    className={cn(
                      "cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-gray-100 text-black",
                      value === option ? "bg-gray-100" : ""
                    )}
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    aria-selected={value === option}
                  >
                    <span className="block truncate">{option}</span>
                    {value === option && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Check className="w-4 h-4 text-black" />
                      </span>
                    )}
                  </li>
                ))
              ) : (
                allowCustomValue ? (
                  <li 
                    className="cursor-pointer py-2 px-4 hover:bg-gray-100 text-black"
                    onClick={() => {
                      if (searchTerm) {
                        onChange(searchTerm);
                        setIsOpen(false);
                        setSearchTerm("");
                      }
                    }}
                  >
                    <span className="text-sm text-black">Create "{searchTerm}"</span>
                  </li>
                ) : (
                  <li className="px-4 py-2 text-sm text-black">
                    No results found
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export { CustomSearchableSelect };
