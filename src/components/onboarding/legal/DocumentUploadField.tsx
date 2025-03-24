
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { FileField } from "@/components/onboarding/common/fields";
import { itemVariants } from "../common/AnimationVariants";

interface DocumentUploadFieldProps {
  files: File[];
  onFilesSelected: (files: File[]) => void;
}

const DocumentUploadField = ({ files, onFilesSelected }: DocumentUploadFieldProps) => {
  return (
    <motion.div 
      custom={4}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <div className="space-y-1">
        <Label>Document Upload<span className="text-red-500 ml-1">*</span></Label>
        <p className="text-sm text-gray-500">
          Please upload scanned copies or PDF files of your legal documents. Include any corporate structure diagrams or ownership charts if available.
        </p>
      </div>
      
      <FileField
        id="legal-documents"
        label="Upload Legal Documents"
        required={true}
        accept="application/pdf,image/*"
        multiple={true}
        hint="Supported formats: PDF, JPG, PNG (max 10MB per file)"
        onFilesChange={onFilesSelected}
      />
    </motion.div>
  );
};

export default DocumentUploadField;
