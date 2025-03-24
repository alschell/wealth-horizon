
import React from "react";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  InputFieldRenderer,
  SelectFieldRenderer,
  SearchableSelectRenderer,
  DateFieldRenderer
} from "./field-components";

interface FormFieldItemProps {
  index: number;
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "number" | "select" | "searchableSelect" | "date";
  required?: boolean;
  options?: string[];
  minValue?: number;
  maxValue?: number;
  className?: string;
  allowCustomValue?: boolean;
}

export const formItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

const FormFieldItem: React.FC<FormFieldItemProps> = ({
  index,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  options = [],
  minValue,
  maxValue,
  className,
  allowCustomValue = false,
}) => {
  const renderField = () => {
    switch (type) {
      case "select":
        return (
          <SelectFieldRenderer
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder || `Select ${label.toLowerCase()}`}
            options={options}
          />
        );
      
      case "searchableSelect":
        return (
          <SearchableSelectRenderer
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder || `Select ${label.toLowerCase()}`}
            options={options}
            label={label}
            allowCustomValue={allowCustomValue}
          />
        );

      case "number":
        return (
          <InputFieldRenderer
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type="number"
            minValue={minValue}
            maxValue={maxValue}
          />
        );
      
      case "date":
        return (
          <DateFieldRenderer
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            label={label}
          />
        );

      default:
        return (
          <InputFieldRenderer
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
          />
        );
    }
  };

  return (
    <motion.div
      custom={index}
      variants={formItemVariants}
      initial="hidden"
      animate="visible"
      className={cn("space-y-2", className)}
    >
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderField()}
    </motion.div>
  );
};

export default FormFieldItem;
