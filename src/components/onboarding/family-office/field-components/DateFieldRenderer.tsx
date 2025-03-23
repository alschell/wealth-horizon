
import React from "react";
import { DatePicker } from "@/components/DatePicker";

interface DateFieldRendererProps {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  required?: boolean;
  label: string;
}

const DateFieldRenderer: React.FC<DateFieldRendererProps> = ({
  name,
  value,
  onChange,
  placeholder,
  required = false,
  label,
}) => {
  const handleDateChange = (date?: Date) => {
    if (date) {
      onChange(name, date.toISOString());
    }
  };

  return (
    <DatePicker
      value={value ? new Date(value) : undefined}
      onChange={handleDateChange}
      label={placeholder || `Select ${label.toLowerCase()}`}
      optional={!required}
    />
  );
};

export default DateFieldRenderer;
