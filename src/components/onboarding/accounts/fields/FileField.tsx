
import React from "react";
import FileUploader from "@/components/FileUploader";

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
  return (
    <div className="space-y-2">
      <FileUploader
        accept="application/pdf,image/*"
        multiple={true}
        maxSize={5}
        onFilesSelected={onFilesSelected}
        existingFiles={files}
        label={label}
      />
    </div>
  );
};

export default FileField;
