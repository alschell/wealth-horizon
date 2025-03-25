
import React from "react";
import { DatePicker } from "@/components/ui/date-picker";

interface DocumentDetailsFieldsProps {
  issueDate: string;
  expiryDate?: string;
  onDateChange: (field: 'issueDate' | 'expiryDate', date?: Date) => void;
}

const DocumentDetailsFields: React.FC<DocumentDetailsFieldsProps> = ({
  issueDate,
  expiryDate,
  onDateChange
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <DatePicker
            id="issueDate"
            value={issueDate ? new Date(issueDate) : undefined}
            onChange={(date) => onDateChange('issueDate', date)}
            placeholder="Select issue date"
            label="Issue Date"
            optional={false}
          />
        </div>
        
        <div className="space-y-2">
          <DatePicker
            id="expiryDate"
            value={expiryDate ? new Date(expiryDate) : undefined}
            onChange={(date) => onDateChange('expiryDate', date)}
            placeholder="Select expiry date"
            label="Expiry Date"
            optional={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailsFields;
