
import React from "react";
import { DatePicker } from "@/components/ui/date-picker";

interface DocumentDetailsFieldsProps {
  issueDate: string;
  expiryDate: string;
  onDateChange: (field: 'issueDate' | 'expiryDate', date?: Date) => void;
  error?: {
    issueDate?: boolean;
  };
}

const DocumentDetailsFields: React.FC<DocumentDetailsFieldsProps> = ({
  issueDate,
  expiryDate,
  onDateChange,
  error
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="space-y-2">
        <DatePicker
          id="issueDate"
          label="Issue Date"
          value={issueDate ? new Date(issueDate) : undefined}
          onChange={(date) => onDateChange('issueDate', date)}
          placeholder="Select issue date"
          className={error?.issueDate ? "border-red-500" : ""}
        />
        {error?.issueDate && (
          <p className="text-sm font-medium text-red-500">
            Please select an issue date
          </p>
        )}
      </div>
      <div className="space-y-2">
        <DatePicker
          id="expiryDate"
          label="Expiry Date"
          value={expiryDate ? new Date(expiryDate) : undefined}
          onChange={(date) => onDateChange('expiryDate', date)}
          optional={true}
          placeholder="Select expiry date"
        />
      </div>
    </div>
  );
};

export default DocumentDetailsFields;
