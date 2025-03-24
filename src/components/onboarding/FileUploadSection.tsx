
import React from "react";
import { Label } from "@/components/ui/label";
import { FileSpreadsheet, FileText, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/FileUploader";

interface FileUploadSectionProps {
  uploadedFiles: File[];
  handleBulkFilesSelected: (files: File[]) => void;
}

const FileUploadSection = ({
  uploadedFiles,
  handleBulkFilesSelected
}: FileUploadSectionProps) => {
  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    handleBulkFilesSelected(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const getFileIcon = (file: File) => {
    const fileType = file.type;
    if (fileType.includes('spreadsheet') || fileType.includes('excel') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv')) {
      return <FileSpreadsheet className="h-8 w-8 text-green-600" />;
    } else {
      return <FileText className="h-8 w-8 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Upload Financial Statements</Label>
        <FileUploader
          accept=".xlsx,.xls,.csv,.pdf,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          multiple={true}
          maxSize={10}
          onFilesSelected={handleBulkFilesSelected}
          existingFiles={uploadedFiles}
          label="Upload Spreadsheets or PDFs"
        />
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-4 mt-6">
          <h3 className="font-medium text-gray-700">Uploaded Files</h3>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 border rounded-md bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(file)}
                  <div>
                    <p className="font-medium truncate max-w-[200px] md:max-w-lg">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-gray-500 hover:text-red-500 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-white border-2 border-black rounded-md">
        <p className="text-sm text-black">
          <strong>Tip:</strong> You can upload bank statements, portfolio reports, or spreadsheets 
          containing your financial account information. We'll help you organize this data 
          for easy portfolio management.
        </p>
      </div>
    </div>
  );
};

export default FileUploadSection;
