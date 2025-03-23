
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
      <Label htmlFor="documentType">Document Type*</Label>
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
          className="z-50 bg-white"
          sideOffset={4}
        >
          <SelectItem value="incorporation">Certificate of Incorporation</SelectItem>
          <SelectItem value="registration">Business Registration</SelectItem>
          <SelectItem value="taxCertificate">Tax Certificate</SelectItem>
          <SelectItem value="ownership">Ownership Structure</SelectItem>
          <SelectItem value="other">Other Legal Document</SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default DocumentTypeField;
