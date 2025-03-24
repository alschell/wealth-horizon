
import React from "react";
import { Upload } from "lucide-react";

interface DropZoneProps {
  label: string;
  accept: string;
  maxSize: number;
  isDragging: boolean;
  onClick: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

const DropZone: React.FC<DropZoneProps> = ({
  label,
  accept,
  maxSize,
  isDragging,
  onClick,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  return (
    <div
      className={`
        border-2 border-dashed rounded-xl p-8 transition-all duration-200
        flex flex-col items-center justify-center cursor-pointer
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'}
      `}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-3 text-center">
        <div className="p-3 rounded-full bg-blue-100">
          <Upload className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-sm text-gray-500 mt-1">
            Drag and drop your files, or <span className="text-blue-600 font-medium">browse</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Max {maxSize}MB per file • {accept.split(',').map(type => type.replace('application/', '').replace('image/', '')).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
