
import React from "react";
import { Input } from "@/components/ui/input";

interface InputFieldRendererProps {
  id: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "number" | "tel" | "url";
  minValue?: number;
  maxValue?: number;
}

const InputFieldRenderer: React.FC<InputFieldRendererProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  minValue,
  maxValue,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <Input
      id={id}
      name={name}
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      className="h-11 bg-white"
      type={type}
      min={minValue}
      max={maxValue}
    />
  );
};

export default InputFieldRenderer;
