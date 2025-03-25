
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import FileUploader from "@/components/file-uploader/FileUploader";

interface FileUploadSectionProps {
  uploadedFiles: File[];
  handleBulkFilesSelected: (files: File[]) => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  uploadedFiles,
  handleBulkFilesSelected
}) => {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-5">
        <FileUploader
          onFilesSelected={handleBulkFilesSelected}
          existingFiles={uploadedFiles}
          multiple={true}
          accept="application/pdf,image/*,.doc,.docx"
          label="Upload Financial Documents"
        />
        
        <div className="mt-4 text-sm text-gray-500">
          <p>Max 10MB per file • PDF, DOC, DOCX, JPG, JPEG, PNG</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadSection;
