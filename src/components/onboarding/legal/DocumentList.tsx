
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { DocumentFileWithMetadata } from "./useLegalDocumentsForm";

interface DocumentListProps {
  documentFiles: DocumentFileWithMetadata[];
  onRemoveDocument: (id: string) => void;
  onEditDocument: (id: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ 
  documentFiles, 
  onRemoveDocument,
  onEditDocument
}) => {
  if (documentFiles.length === 0) {
    return null;
  }

  // Function to format the document type for display
  const formatDocumentType = (type: string): string => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Function to safely get file size
  const getFileSizeInMB = (file: File): string => {
    return (file.size / (1024 * 1024)).toFixed(2);
  };

  return (
    <div className="border p-5 rounded-md space-y-3">
      <h3 className="font-medium">Added Legal Documents</h3>
      <div className="space-y-3">
        {documentFiles.map((document) => (
          <div key={document.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gray-200 rounded-md flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {document.file.name.split('.').pop()?.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">
                  {formatDocumentType(document.documentType || '')}
                </p>
                <p className="text-xs text-gray-500">{getFileSizeInMB(document.file)} MB</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-blue-500 p-2 h-auto"
                onClick={() => onEditDocument(document.id)}
              >
                <Edit className="h-5 w-5" />
                <span className="sr-only">Edit document</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-500 p-2 h-auto"
                onClick={() => onRemoveDocument(document.id)}
              >
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Remove document</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
