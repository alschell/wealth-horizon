
import React from "react";
import { FileField as CommonFileField } from "@/components/onboarding/common/fields";

interface FileFieldProps {
  label: string;
  files: File[];
  onFilesSelected: (files: File[]) => void;
  optional?: boolean;
  accept?: string;
  hint?: string;
  multiple?: boolean;
}

const FileField: React.FC<FileFieldProps> = ({
  label,
  files,
  onFilesSelected,
  optional = true,
  accept = "application/pdf,image/*",
  hint = "Upload PDF documents or images (max 5MB per file)",
  multiple = true
}) => {
  const handleFilesChange = (newFiles: File[]) => {
    onFilesSelected(newFiles);
  };

  return (
    <CommonFileField
      id={`field-${label.toLowerCase().replace(/\s+/g, '-')}`}
      label={label}
      files={files}
      required={!optional}
      accept={accept}
      multiple={multiple}
      hint={hint}
      onFilesChange={handleFilesChange}
    />
  );
};

export default FileField;
