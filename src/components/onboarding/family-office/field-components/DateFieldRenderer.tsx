
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

  return (
    <div className="space-y-2">
      <DatePicker
        label={label}
        placeholder={placeholder || `Select ${label.toLowerCase()}`}
        value={value ? new Date(value) : undefined}
        onChange={handleDateChange}
        optional={!required}
        className="w-full"
      />
    </div>
  );
};

export default DateFieldRenderer;
