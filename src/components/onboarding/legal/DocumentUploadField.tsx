
import React from "react";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/file-uploader";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DocumentUploadFieldProps {
  files: File[];
  onFilesSelected: (files: File[]) => void;
  error?: boolean;
  documentType?: string;
}

const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({ 
  files, 
  onFilesSelected,
  error,
  documentType
}) => {
  // Function to format the document type for display
  const formatDocumentType = (type: string): string => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="documentFiles">
        Upload Legal Documents<span className="text-red-500 ml-1">*</span>
      </Label>
      <div 
        className={cn(
          "border rounded-md p-4",
          error && "border-red-500"
        )}
      >
        <FileUploader
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          multiple={true}
          maxSize={10}
          onFilesSelected={onFilesSelected}
          existingFiles={files}
          label="Upload Legal Documents"
        />
      </div>
      
      {files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-3 flex-1 mr-3 truncate">
                <div className="w-9 h-9 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {file.name.split('.').pop()?.toUpperCase()}
                  </span>
                </div>
                <div className="truncate flex-1">
                  <p className="text-sm font-medium truncate">
                    {documentType ? formatDocumentType(documentType) : file.name}
                  </p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-500 p-2 h-auto flex-shrink-0"
                onClick={() => {
                  const updatedFiles = [...files];
                  updatedFiles.splice(index, 1);
                  onFilesSelected(updatedFiles);
                }}
              >
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <p className="text-sm font-medium text-red-500">
          Please upload at least one document
        </p>
      )}
    </div>
  );
};

export default DocumentUploadField;
