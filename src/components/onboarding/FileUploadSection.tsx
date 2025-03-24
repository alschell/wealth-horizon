
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import FileUploader from "@/components/file-uploader/FileUploader";
import { AlertCircle } from "lucide-react";

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
        {uploadedFiles.length === 0 ? (
          <div className="text-center py-8 border rounded-lg bg-gray-50 mb-4">
            <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No files uploaded yet.</p>
            <p className="text-sm text-gray-400 mt-1">Please upload your financial documents.</p>
          </div>
        ) : null}
        
        <FileUploader
          onFilesSelected={handleBulkFilesSelected}
          existingFiles={uploadedFiles}
          multiple={true}
          accept="application/pdf,image/*,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          label="Upload Financial Documents"
        />
        
        <div className="mt-4 text-sm text-gray-500">
          <p>Accepted file formats: PDF, Excel, and image files.</p>
          <p>Max file size: 10MB per file.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadSection;
