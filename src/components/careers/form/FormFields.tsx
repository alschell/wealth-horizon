
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
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  error
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center">
        {label} <span className="text-indigo-600 ml-1" aria-hidden="true">*</span>
      </Label>
      <Input 
        id={id} 
        type={type}
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        required 
        aria-required="true"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
