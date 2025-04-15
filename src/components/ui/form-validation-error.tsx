
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

interface FormValidationErrorProps {
  errors?: Record<string, string>;
  className?: string;
  showAllErrors?: boolean;
}

/**
 * Component for displaying form validation errors
 */
export const FormValidationError: React.FC<FormValidationErrorProps> = ({
  errors = {},
  className,
  showAllErrors = false
}) => {
  const errorList = Object.entries(errors);
  
  if (errorList.length === 0) {
    return null;
  }
  
  return (
    <div className={cn("mt-4 p-3 border border-red-200 bg-red-50 rounded-md", className)}>
      <div className="flex items-center gap-2 mb-2 text-red-700">
        <AlertTriangle className="h-5 w-5" />
        <h3 className="font-medium">Please fix the following errors:</h3>
      </div>
      
      <ul className="space-y-1 list-disc pl-5 text-sm text-red-700">
        {showAllErrors ? (
          // Show all errors
          errorList.map(([field, message]) => (
            <li key={field}>
              <span className="font-medium">{field}: </span>
              {message}
            </li>
          ))
        ) : (
          // Show only the first error
          <li>
            <span className="font-medium">{errorList[0][0]}: </span>
            {errorList[0][1]}
          </li>
        )}
      </ul>
    </div>
  );
};

export default FormValidationError;
