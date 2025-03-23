
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  id,
  label,
  name,
  value,
  placeholder,
  type = "text",
  required = false,
  onChange
}: InputFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}{required && "*"}
      </Label>
      <Input
        id={id}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className="h-11"
      />
    </div>
  );
};

export default InputField;
