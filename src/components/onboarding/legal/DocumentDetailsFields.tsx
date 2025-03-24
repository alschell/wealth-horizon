
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

interface DocumentDetailsFieldsProps {
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (field: 'issueDate' | 'expiryDate', date?: Date) => void;
}

const DocumentDetailsFields: React.FC<DocumentDetailsFieldsProps> = ({
  documentNumber,
  issueDate,
  expiryDate,
  onInputChange,
  onDateChange
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="documentNumber">
          Document Number<span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="documentNumber"
          name="documentNumber"
          value={documentNumber}
          onChange={onInputChange}
          placeholder="Enter document number"
          className="h-11"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          label="Issue Date"
          placeholder="Select issue date"
          value={issueDate ? new Date(issueDate) : undefined}
          onChange={(date) => onDateChange('issueDate', date)}
          optional={false}
        />
        
        <DatePicker
          label="Expiry Date"
          placeholder="Select expiry date (optional)"
          value={expiryDate ? new Date(expiryDate) : undefined}
          onChange={(date) => onDateChange('expiryDate', date)}
          optional={true}
        />
      </div>
    </div>
  );
};

export default DocumentDetailsFields;
