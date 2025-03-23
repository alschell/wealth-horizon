
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";
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
      <Label>Document Upload*</Label>
      <p className="text-sm text-gray-500 mb-2">
        Please upload scanned copies or PDF files of your legal documents. Include any corporate structure diagrams or ownership charts if available.
      </p>
      <FileUploader
        accept="application/pdf,image/*"
        multiple={true}
        maxSize={10}
        onFilesSelected={onFilesSelected}
        existingFiles={files}
        label="Upload Legal Documents"
      />
    </motion.div>
  );
};

export default DocumentUploadField;
