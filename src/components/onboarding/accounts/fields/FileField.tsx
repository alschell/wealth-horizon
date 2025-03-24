
import React from "react";
import { FileField as CommonFileField } from "@/components/onboarding/common/fields";

interface FileFieldProps {
  label: string;
  files: File[];
  onFilesSelected: (files: File[]) => void;
  optional?: boolean;
}

const FileField: React.FC<FileFieldProps> = ({
  label,
  files,
  onFilesSelected,
  optional = true
}) => {
  const handleFilesChange = (newFiles: File[]) => {
    onFilesSelected(newFiles);
  };

  return (
    <CommonFileField
      id={`field-${label.toLowerCase().replace(/\s+/g, '-')}`}
      label={label}
      required={!optional}
      accept="application/pdf,image/*"
      multiple={true}
      hint="Upload PDF documents or images (max 5MB per file)"
      onFilesChange={handleFilesChange}
    />
  );
};

export default FileField;
