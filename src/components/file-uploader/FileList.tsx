
import React from "react";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { DeleteButton } from "@/components/ui/action-buttons";

interface FileListProps {
  files: File[];
  onDeleteClick: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDeleteClick }) => {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Uploaded Files</p>
      <div className="space-y-2">
        {files.map((file, index) => (
          <Card key={`${file.name}-${index}`} className="flex items-center justify-between p-3 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-blue-50">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div className="truncate">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <DeleteButton
              size="icon"
              onClick={() => onDeleteClick(index)}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FileList;
