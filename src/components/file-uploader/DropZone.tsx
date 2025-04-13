
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
  disabled?: boolean;
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
  disabled = false,
}) => {
  // Format the accept string for display
  const formatAcceptString = (acceptString: string) => {
    return acceptString
      .split(',')
      .map(type => {
        if (type.startsWith('.')) return type.substring(1).toUpperCase();
        if (type.includes('/')) {
          const parts = type.split('/');
          if (parts[1] === '*') return parts[0].toUpperCase() + ' files';
          return parts[1].toUpperCase();
        }
        return type;
      })
      .join(', ');
  };

  const acceptDisplay = formatAcceptString(accept);

  return (
    <div
      className={`
        border-2 border-dashed rounded-xl p-8 transition-all duration-200
        flex flex-col items-center justify-center
        ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'}
      `}
      onDragOver={!disabled ? onDragOver : undefined}
      onDragLeave={!disabled ? onDragLeave : undefined}
      onDrop={!disabled ? onDrop : undefined}
      onClick={!disabled ? onClick : undefined}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={`Drop zone for ${label}`}
    >
      <div className="flex flex-col items-center space-y-3 text-center">
        <div className="p-3 rounded-full bg-blue-100">
          <Upload className="h-6 w-6 text-blue-600" aria-hidden="true" />
        </div>
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-sm text-gray-500 mt-1">
            {disabled 
              ? "File upload is currently disabled" 
              : (
                <>
                  Drag and drop your files, or <span className="text-blue-600 font-medium">browse</span>
                </>
              )
            }
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Max {maxSize}MB per file • {acceptDisplay}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
