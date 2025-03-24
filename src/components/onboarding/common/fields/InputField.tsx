
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  name?: string; // Make name optional
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputField = ({
  id,
  label,
  name,
  value,
  placeholder = "",
  type = "text",
  required = false,
  error,
  onChange,
  className
}: InputFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        name={name || id} // Use id as fallback if name is not provided
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className={cn("h-11", error ? "border-red-500" : "")}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;
