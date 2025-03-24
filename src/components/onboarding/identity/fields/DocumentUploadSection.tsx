
import React from "react";
import { Label } from "@/components/ui/label";
import { FileField } from "@/components/onboarding/common/fields";
import { motion } from "framer-motion";
import { itemVariants } from "../../common/AnimationVariants";

interface DocumentUploadSectionProps {
  files: File[];
  onFilesSelected: (files: File[]) => void;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({ 
  files, 
  onFilesSelected 
}) => {
  return (
    <motion.div 
      custom={4}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <div className="space-y-1">
        <Label className="text-black">Document Upload<span className="text-red-500 ml-1">*</span></Label>
      </div>
      
      <FileField
        id="identity-documents"
        label="Upload Identification Documents"
        required={true}
        accept="application/pdf,image/*"
        multiple={true}
        hint="Supported formats: PDF, JPG, PNG (max 5MB per file)"
        onFilesChange={onFilesSelected}
      />
    </motion.div>
  );
};

export default DocumentUploadSection;
