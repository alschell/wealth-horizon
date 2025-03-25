
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { itemVariants } from "../../common/AnimationVariants";
import DateField from "../../common/fields/DateField";

interface DocumentDetailsFieldsProps {
  documentNumber: string;
  issueDate: string;
  expiryDate?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange?: (field: string, value: string) => void;
  formTouched?: boolean;
  errors?: Record<string, string>;
}

const DocumentDetailsFields: React.FC<DocumentDetailsFieldsProps> = ({
  documentNumber,
  issueDate,
  expiryDate,
  onChange,
  onDateChange,
  formTouched = false,
  errors = {}
}) => {
  // Only show errors if the form has been touched
  const showErrors = formTouched ? errors : {};
  
  const handleDateChange = (field: string, value: string) => {
    if (onDateChange) {
      onDateChange(field, value);
    }
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          custom={1}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <Label htmlFor="documentNumber">Document Number<span className="text-red-500 ml-1">*</span></Label>
          <Input
            id="documentNumber"
            name="documentNumber"
            value={documentNumber}
            onChange={onChange}
            placeholder="Document ID Number"
            className={`h-11 ${showErrors.documentNumber ? 'border-red-500' : ''}`}
          />
          {showErrors.documentNumber && (
            <p className="text-red-500 text-sm mt-1">{showErrors.documentNumber}</p>
          )}
        </motion.div>

        <motion.div 
          custom={2}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {onDateChange ? (
            <DateField
              id="issueDate"
              label="Issue Date"
              value={issueDate}
              onChange={(date) => handleDateChange("issueDate", date)}
              required={true}
              closeOnSelect={true}
              error={showErrors.issueDate}
            />
          ) : (
            <>
              <Label htmlFor="issueDate">Issue Date<span className="text-red-500 ml-1">*</span></Label>
              <Input
                id="issueDate"
                name="issueDate"
                type="date"
                value={issueDate}
                onChange={onChange}
                className={`h-11 ${showErrors.issueDate ? 'border-red-500' : ''}`}
              />
              {showErrors.issueDate && (
                <p className="text-red-500 text-sm mt-1">{showErrors.issueDate}</p>
              )}
            </>
          )}
        </motion.div>

        <motion.div 
          custom={3}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="col-span-1 md:col-span-2 space-y-2"
        >
          {onDateChange ? (
            <DateField
              id="expiryDate"
              label="Expiry Date"
              value={expiryDate || ""}
              onChange={(date) => handleDateChange("expiryDate", date)}
              required={false}
              closeOnSelect={true}
            />
          ) : (
            <>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="date"
                value={expiryDate || ""}
                onChange={onChange}
                className="h-11"
              />
            </>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default DocumentDetailsFields;
