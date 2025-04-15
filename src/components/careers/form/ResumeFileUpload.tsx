
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { File, Upload, X } from "lucide-react";
import { announceToScreenReader } from "@/utils/a11y";

interface ResumeFileUploadProps {
  /** Currently selected resume file (or null if none) */
  resumeFile: File | null;
  /** Function to set the selected resume file */
  setResumeFile: (file: File | null) => void;
  /** Error message to display (if any) */
  error?: string;
  /** Handler for file input change events */
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * A fully accessible file upload component for resumes
 */
export const ResumeFileUpload: React.FC<ResumeFileUploadProps> = ({
  resumeFile,
  setResumeFile,
  error,
  handleFileChange,
  disabled = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const errorId = "resume-file-error";
  const labelId = "resume-file-label";
  const descriptionId = "resume-file-description";

  /**
   * Handle click on the upload area - opens file dialog
   */
  const handleButtonClick = () => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.click();
    }
  };

  /**
   * Remove the currently selected file
   */
  const handleRemoveFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    announceToScreenReader("Resume file removed");
  };

  /**
   * Handle keyboard navigation for the upload area
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleButtonClick();
    }
  };

  return (
    <div className="space-y-2">
      <div 
        className={`border-2 border-dashed rounded-md p-4 ${
          error ? "border-red-500" : "border-gray-300"
        } ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        aria-describedby={`${descriptionId} ${error ? errorId : ''}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            handleFileChange(e);
            if (e.target.files && e.target.files[0]) {
              announceToScreenReader(`File ${e.target.files[0].name} selected`);
            }
          }}
          aria-labelledby={labelId}
          aria-describedby={error ? errorId : descriptionId}
          aria-invalid={!!error}
          disabled={disabled}
          data-testid="resume-file-input"
        />

        {resumeFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <File className="h-5 w-5 text-blue-500" aria-hidden="true" />
              <span id={labelId} className="text-sm font-medium">{resumeFile.name}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
              onClick={handleRemoveFile}
              aria-label={`Remove resume file: ${resumeFile.name}`}
              disabled={disabled}
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        ) : (
          <div 
            className="flex flex-col items-center justify-center py-4"
            onClick={handleButtonClick}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-labelledby={labelId}
            onKeyDown={handleKeyDown}
          >
            <Upload className="h-8 w-8 text-gray-400 mb-2" aria-hidden="true" />
            <p id={labelId} className="text-sm text-center font-medium text-gray-700">
              Drag and drop your resume or <span className="text-blue-500">browse files</span>
            </p>
            <p id={descriptionId} className="text-xs text-gray-500 mt-1">
              PDF, DOC, or DOCX files up to 5MB
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <p 
          id={errorId}
          className="text-sm font-medium text-red-500"
          aria-live="assertive"
        >
          {error}
        </p>
      )}
    </div>
  );
};
