
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { itemVariants } from "../../common/AnimationVariants";

interface DocumentDetailsFieldsProps {
  documentNumber: string;
  issueDate: string;
  expiryDate?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DocumentDetailsFields: React.FC<DocumentDetailsFieldsProps> = ({
  documentNumber,
  issueDate,
  expiryDate,
  onChange
}) => {
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
            className="h-11"
          />
        </motion.div>

        <motion.div 
          custom={2}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          <Label htmlFor="issueDate">Issue Date<span className="text-red-500 ml-1">*</span></Label>
          <Input
            id="issueDate"
            name="issueDate"
            type="date"
            value={issueDate}
            onChange={onChange}
            className="h-11"
          />
        </motion.div>

        <motion.div 
          custom={3}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="col-span-1 md:col-span-2 space-y-2"
        >
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            type="date"
            value={expiryDate || ""}
            onChange={onChange}
            className="h-11"
          />
        </motion.div>
      </div>
    </>
  );
};

export default DocumentDetailsFields;
