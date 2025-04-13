
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import FileUploader from "@/components/file-uploader/FileUploader";

interface FileUploadSectionProps {
  uploadedFiles: File[];
  handleBulkFilesSelected: (files: File[]) => void;
  title?: string;
  allowedFileTypes?: string;
  maxFileSize?: number;
  disabled?: boolean;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  uploadedFiles,
  handleBulkFilesSelected,
  title = "Upload Account Statements",
  allowedFileTypes = "application/pdf,image/*,.doc,.docx",
  maxFileSize = 10,
  disabled = false
}) => {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-5">
        <FileUploader
          onFilesSelected={handleBulkFilesSelected}
          existingFiles={uploadedFiles}
          multiple={true}
          accept={allowedFileTypes}
          label={title}
          maxSize={maxFileSize}
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
};

export default FileUploadSection;
