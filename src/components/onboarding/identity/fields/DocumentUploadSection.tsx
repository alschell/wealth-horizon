
import React from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";
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
      <Label>Document Upload<span className="text-red-500 ml-1">*</span></Label>
      <p className="text-sm text-gray-500 mb-2">
        Please upload scanned copies or high-quality photos of your identification document (front and back if applicable).
      </p>
      <FileUploader
        accept="application/pdf,image/*"
        multiple={true}
        maxSize={5}
        onFilesSelected={onFilesSelected}
        existingFiles={files}
        label="Upload Identification Documents"
      />
    </motion.div>
  );
};

export default DocumentUploadSection;
