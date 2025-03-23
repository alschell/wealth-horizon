
import React, { useState } from "react";
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
        <SelectTrigger className="h-11 bg-white">
          <SelectValue placeholder="Select document type" />
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          className="z-50 bg-white"
          sideOffset={4}
        >
          <SelectItem value="incorporation" className="cursor-pointer">Certificate of Incorporation</SelectItem>
          <SelectItem value="registration" className="cursor-pointer">Business Registration</SelectItem>
          <SelectItem value="taxCertificate" className="cursor-pointer">Tax Certificate</SelectItem>
          <SelectItem value="ownership" className="cursor-pointer">Ownership Structure</SelectItem>
          <SelectItem value="other" className="cursor-pointer">Other Legal Document</SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default DocumentTypeField;
