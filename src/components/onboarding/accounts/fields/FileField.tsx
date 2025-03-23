
import React from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/FileUploader";

interface FileFieldProps {
  label: string;
  files: File[];
  onFilesSelected: (files: File[]) => void;
}

const FileField = ({
  label,
  files,
  onFilesSelected
}: FileFieldProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <FileUploader
        label={`Upload ${label.toLowerCase()}`}
        onFilesSelected={onFilesSelected}
        existingFiles={files}
      />
    </div>
  );
};

export default FileField;
