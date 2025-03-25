
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DocumentListProps {
  documentFiles: File[];
  onRemoveDocument: (index: number) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ 
  documentFiles, 
  onRemoveDocument 
}) => {
  if (documentFiles.length === 0) {
    return null;
  }

  return (
    <div className="border p-5 rounded-md space-y-3">
      <h3 className="font-medium">Added Documents</h3>
      <div className="space-y-3">
        {documentFiles.map((file, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gray-200 rounded-md flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {file.name.split('.').pop()?.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-500 p-2 h-auto"
              onClick={() => onRemoveDocument(index)}
            >
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
