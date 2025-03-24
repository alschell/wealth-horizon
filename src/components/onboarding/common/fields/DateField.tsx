
import React from "react";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";

interface DateFieldProps {
  id: string;
  label: string;
  value?: Date;
  placeholder?: string;
  required?: boolean;
  error?: string;
  onChange: (date?: Date) => void;
  className?: string;
}

const DateField = ({
  id,
  label,
  value,
  placeholder,
  required = false,
  error,
  onChange,
  className
}: DateFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className={cn(error ? "border border-red-500 rounded-md" : "")}>
        <DatePicker
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder || `Select ${label.toLowerCase()}`}
          className="w-full"
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default DateField;
