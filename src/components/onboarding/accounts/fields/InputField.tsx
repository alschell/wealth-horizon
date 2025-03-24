
import React from "react";
import { InputField as CommonInputField } from "@/components/onboarding/common/fields";

interface InputFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  disabled?: boolean;
}

const InputField = ({
  id,
  label,
  name,
  value,
  placeholder,
  type = "text",
  required = false,
  error,
  onChange,
  maxLength,
  disabled
}: InputFieldProps) => {
  return (
    <CommonInputField
      id={id}
      label={label}
      name={name}
      value={value || ""}
      placeholder={placeholder}
      type={type}
      required={required}
      error={error}
      onChange={onChange}
      maxLength={maxLength}
      disabled={disabled}
    />
  );
};

export default InputField;
