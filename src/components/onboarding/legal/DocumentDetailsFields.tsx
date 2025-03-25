
import React from "react";
import { Label } from "@/components/ui/label";
import DateField from "@/components/onboarding/common/fields/DateField";

interface DocumentDetailsFieldsProps {
  issueDate: string;
  expiryDate: string;
  onDateChange: (field: 'issueDate' | 'expiryDate', date?: Date) => void;
  error: Record<string, boolean>;
  formTouched?: boolean;
}

const DocumentDetailsFields: React.FC<DocumentDetailsFieldsProps> = ({
  issueDate,
  expiryDate,
  onDateChange,
  error,
  formTouched = false
}) => {
  // Only show errors if the form has been touched
  const showErrors = formTouched ? error : {};
  
  const handleDateFieldChange = (field: 'issueDate' | 'expiryDate', dateString: string) => {
    if (dateString) {
      onDateChange(field, new Date(dateString));
    } else {
      onDateChange(field, undefined);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <DateField
          id="issueDate"
          label="Issue Date"
          required={true}
          value={issueDate}
          onChange={(date) => handleDateFieldChange('issueDate', date)}
          error={showErrors.issueDate ? "This field is required" : undefined}
          closeOnSelect={true}
        />
      </div>
      
      <div>
        <DateField
          id="expiryDate"
          label="Expiry Date"
          required={false}
          value={expiryDate || ""}
          onChange={(date) => handleDateFieldChange('expiryDate', date)}
          closeOnSelect={true}
        />
      </div>
    </div>
  );
};

export default DocumentDetailsFields;
