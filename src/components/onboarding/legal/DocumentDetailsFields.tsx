
import React from "react";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="issueDate">
          Issue Date<span className="text-red-500 ml-1">*</span>
        </Label>
        <DatePicker
          id="issueDate"
          value={issueDate ? new Date(issueDate) : undefined}
          onChange={(date) => onDateChange('issueDate', date)}
          label="Issue Date"
          className={cn(error?.issueDate && "border-red-500")}
        />
        {error?.issueDate && (
          <p className="text-sm font-medium text-red-500">
            Please select an issue date
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="expiryDate">
          Expiry Date <span className="text-gray-500 text-xs font-normal">(Optional)</span>
        </Label>
        <DatePicker
          id="expiryDate"
          value={expiryDate ? new Date(expiryDate) : undefined}
          onChange={(date) => onDateChange('expiryDate', date)}
          label="Expiry Date"
        />
      </div>
    </div>
  );
};

export default DocumentDetailsFields;
