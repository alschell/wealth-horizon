
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  required = true
}) => {
  // Generate a unique ID for the error message
  const errorId = `${id}-error`;
  
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center">
        {label}
        {required && <span className="text-indigo-600 ml-1" aria-hidden="true">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(error ? "border-red-500" : "")}
        aria-required={required}
        aria-invalid={!!error}
        // Only set aria-describedby when there's actually an error
        {...(error ? { "aria-describedby": errorId } : {})}
      />
      {error && (
        <p 
          id={errorId}
          className="text-sm font-medium text-red-500"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};
