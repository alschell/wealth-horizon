
import React from "react";
import { DatePicker } from "@/components/ui/date-picker";

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
  label,
  required = false,
}) => {
  const handleDateChange = (date?: Date) => {
    if (date) {
      onChange(name, date.toISOString());
    }
  };

  // Parse the ISO string to Date object for the DatePicker
  const dateValue = value ? new Date(value) : undefined;

  return (
    <div className="space-y-2 w-full">
      <DatePicker
        label={label}
        placeholder={placeholder || `Select ${label.toLowerCase()}`}
        value={dateValue}
        onChange={handleDateChange}
        optional={!required}
        className="w-full"
      />
    </div>
  );
};

export default DateFieldRenderer;
