
import React from "react";
import { motion } from "framer-motion";
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
