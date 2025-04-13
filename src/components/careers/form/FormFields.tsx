
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
  autoComplete?: string;
  required?: boolean;
  maxLength?: number;
  pattern?: string;
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  error,
  autoComplete,
  required = true,
  maxLength,
  pattern,
  disabled = false
}) => {
  const inputId = `field-${id}`;
  const errorId = error ? `${inputId}-error` : undefined;
  
  return (
    <div className="space-y-2">
      <Label 
        htmlFor={inputId} 
        className="flex items-center"
      >
        {label}
        {required && <span className="text-indigo-600 ml-1" aria-hidden="true">*</span>}
      </Label>
      <Input 
        id={inputId} 
        type={type}
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={errorId}
        autoComplete={autoComplete}
        maxLength={maxLength}
        pattern={pattern}
        disabled={disabled}
        className={error ? "border-red-300 focus-visible:ring-red-200" : ""}
      />
      {error && (
        <p 
          id={errorId}
          className="text-sm text-red-500 mt-1" 
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};
