
import React from "react";
import { FileField } from "@/components/onboarding/common/fields";

interface FileFieldRendererProps {
  name: string;
  label: string;
  onChange: (name: string, files: File[]) => void;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
  hint?: string;
}

const FileFieldRenderer: React.FC<FileFieldRendererProps> = ({
  name,
  label,
  onChange,
  required = false,
  accept = "application/pdf,image/*",
  multiple = true,
  hint = "Upload PDF documents or images (max 5MB per file)"
}) => {
  const handleFilesChange = (files: File[]) => {
    onChange(name, files);
  };

  return (
    <FileField
      id={`field-${name}`}
      label={label}
      required={required}
      accept={accept}
      multiple={multiple}
      hint={hint}
      onFilesChange={handleFilesChange}
    />
  );
};

export default FileFieldRenderer;
