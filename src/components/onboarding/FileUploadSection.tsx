
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import FileUploader from "@/components/file-uploader/FileUploader";
import { Separator } from "@/components/ui/separator";

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
          label="Upload Account Statements"
        />
        
        <Separator className="my-6" />
        <p className="text-sm text-gray-500">
          Fields marked with <span className="text-red-500">*</span> are required.
        </p>
      </CardContent>
    </Card>
  );
};

export default FileUploadSection;
