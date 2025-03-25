
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputFieldProps {
  id: string;
  label: string;
  name: string;
  value: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
}

const InputField = ({
  id,
  label,
  name,
  value,
  placeholder,
  onChange,
  type = "text",
  required = false,
  error,
  disabled = false,
  className,
  maxLength
}: InputFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={cn(
          "h-11 bg-white",
          error ? "border-red-500" : ""
        )}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;
