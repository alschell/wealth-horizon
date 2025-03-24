
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { itemVariants } from "../common/AnimationVariants";

interface DocumentDetailsFieldsProps {
  documentNumber: string;
  issueDate: string;
  expiryDate?: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DocumentDetailsFields = ({ 
  documentNumber, 
  issueDate, 
  expiryDate, 
  onInputChange 
}: DocumentDetailsFieldsProps) => {
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
        <Label htmlFor="issueDate">Issue Date*</Label>
        <Input
          id="issueDate"
          name="issueDate"
          type="date"
          value={issueDate}
          onChange={onInputChange}
          className="h-11 bg-white border border-gray-300 focus:border-black focus:ring-black"
        />
      </motion.div>

      <motion.div 
        custom={3}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <Label htmlFor="expiryDate">Expiry Date (if applicable)</Label>
        <Input
          id="expiryDate"
          name="expiryDate"
          type="date"
          value={expiryDate || ""}
          onChange={onInputChange}
          className="h-11 bg-white border border-gray-300 focus:border-black focus:ring-black"
        />
      </motion.div>
    </div>
  );
};

export default DocumentDetailsFields;
