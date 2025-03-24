
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";

interface DocumentDetailsFieldsProps {
  documentNumber: string;
  issueDate: string;
  expiryDate?: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (field: 'issueDate' | 'expiryDate', date?: Date) => void;
  documentNumberRequired?: boolean;
}

const DocumentDetailsFields: React.FC<DocumentDetailsFieldsProps> = ({
  documentNumber,
  issueDate,
  expiryDate,
  onInputChange,
  onDateChange,
  documentNumberRequired = false
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="documentNumber">
            Document Number
            {documentNumberRequired && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Input
            id="documentNumber"
            name="documentNumber"
            value={documentNumber}
            onChange={onInputChange}
            placeholder="Document ID/Reference Number"
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="issueDate">Issue Date<span className="text-red-500 ml-1">*</span></Label>
          <DatePicker
            id="issueDate"
            value={issueDate ? new Date(issueDate) : undefined}
            onChange={(date) => onDateChange('issueDate', date)}
            placeholder="Select issue date"
            label="Issue Date"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="expiryDate">Expiry Date <span className="text-gray-400 text-sm">(if applicable)</span></Label>
        <DatePicker
          id="expiryDate"
          value={expiryDate ? new Date(expiryDate) : undefined}
          onChange={(date) => onDateChange('expiryDate', date)}
          placeholder="Select expiry date"
          label="Expiry Date"
        />
      </div>
    </div>
  );
};

export default DocumentDetailsFields;
