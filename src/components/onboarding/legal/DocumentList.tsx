
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { File, Pencil, Trash } from "lucide-react";
import { format } from "date-fns";
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
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Added Legal Documents</h3>
      </div>
      <Separator />
      
      <div className="space-y-4">
        {documentFiles.map((doc) => (
          <div key={doc.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <File className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-medium">{doc.documentType}</h4>
                  <div className="text-sm text-gray-500 mt-1 space-y-1">
                    <p>Issue Date: {doc.issueDate ? format(new Date(doc.issueDate), 'PPP') : 'N/A'}</p>
                    {doc.expiryDate && (
                      <p>Expiry Date: {format(new Date(doc.expiryDate), 'PPP')}</p>
                    )}
                    <p>File: {doc.file.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="ghost" 
                  size="sm"
                  className="text-gray-500 hover:text-blue-500"
                  onClick={() => onEditDocument(doc.id)}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit document</span>
                </Button>
                <Button
                  variant="ghost" 
                  size="sm"
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => onRemoveDocument(doc.id)}
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Remove document</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
