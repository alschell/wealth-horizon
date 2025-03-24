
import React from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";

interface FileFieldProps {
  label: string;
  files: File[];
  onFilesSelected: (files: File[]) => void;
  optional?: boolean;
}

const FileField = ({
  label,
  files,
  onFilesSelected,
  optional = false
}: FileFieldProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}{!optional && <span className="text-red-500 ml-1">*</span>}</Label>
      <FileUploader
        label={`Upload ${label.toLowerCase()}`}
        onFilesSelected={onFilesSelected}
        existingFiles={files}
      />
      {optional && (
        <p className="text-xs text-gray-500 mt-1">This field is optional</p>
      )}
    </div>
  );
};

export default FileField;
