
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { itemVariants } from "../common/AnimationVariants";

interface DocumentDetailsFieldsProps {
  documentNumber: string;
  issueDate: string;
  expiryDate?: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (field: string, value: string) => void;
}

const DocumentDetailsFields = ({ 
  documentNumber, 
  issueDate, 
  expiryDate, 
  onInputChange,
  onDateChange 
}: DocumentDetailsFieldsProps) => {
  const handleIssueDateChange = (date?: Date) => {
    if (date) {
      onDateChange("issueDate", date.toISOString());
    }
  };

  const handleExpiryDateChange = (date?: Date) => {
    if (date) {
      onDateChange("expiryDate", date.toISOString());
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div 
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <Label htmlFor="documentNumber">Document Number*</Label>
        <Input
          id="documentNumber"
          name="documentNumber"
          value={documentNumber}
          onChange={onInputChange}
          placeholder="Document ID or Reference"
          className="h-11 bg-white border border-gray-300 focus:border-black focus:ring-black"
        />
      </motion.div>

      <motion.div 
        custom={2}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <DatePicker
          label="Issue Date*"
          placeholder="Select issue date"
          value={issueDate ? new Date(issueDate) : undefined}
          onChange={handleIssueDateChange}
        />
      </motion.div>

      <motion.div 
        custom={3}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <DatePicker
          label="Expiry Date"
          placeholder="Select expiry date (if applicable)"
          value={expiryDate ? new Date(expiryDate) : undefined}
          onChange={handleExpiryDateChange}
          optional={true}
        />
      </motion.div>
    </div>
  );
};

export default DocumentDetailsFields;
