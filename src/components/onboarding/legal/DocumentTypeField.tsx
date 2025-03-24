
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { itemVariants } from "../common/AnimationVariants";

type DocumentType = "incorporation" | "registration" | "taxCertificate" | "ownership" | "other";

interface DocumentTypeFieldProps {
  value: DocumentType;
  onChange: (value: DocumentType) => void;
}

const DocumentTypeField = ({ value, onChange }: DocumentTypeFieldProps) => {
  return (
    <motion.div 
      custom={0}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-2"
    >
      <Label htmlFor="documentType">Document Type<span className="text-red-500 ml-1">*</span></Label>
      <Select
        value={value}
        onValueChange={(value: DocumentType) => onChange(value)}
      >
        <SelectTrigger 
          id="documentType" 
          className="h-11 bg-white"
        >
          <SelectValue placeholder="Select document type" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          className="bg-white border shadow-md z-[999]"
          sideOffset={8}
          align="start"
        >
          <SelectItem value="incorporation" className="hover:bg-gray-100 cursor-pointer">Certificate of Incorporation</SelectItem>
          <SelectItem value="registration" className="hover:bg-gray-100 cursor-pointer">Business Registration</SelectItem>
          <SelectItem value="taxCertificate" className="hover:bg-gray-100 cursor-pointer">Tax Certificate</SelectItem>
          <SelectItem value="ownership" className="hover:bg-gray-100 cursor-pointer">Ownership Structure</SelectItem>
          <SelectItem value="other" className="hover:bg-gray-100 cursor-pointer">Other Legal Document</SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default DocumentTypeField;
