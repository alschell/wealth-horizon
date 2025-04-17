
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  title?: string;
  description?: string;
  showResetButton?: boolean;
  buttonText?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
  title = 'Something went wrong',
  description,
  showResetButton = true,
  buttonText = 'Try again'
}) => {
  const errorMessage = description || error.message || 'An unexpected error occurred';
  
  return (
    <div className="p-6 rounded-lg bg-red-50 border border-red-100 text-center space-y-4">
      <div className="flex justify-center mb-2">
        <AlertCircle className="h-10 w-10 text-red-500" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      
      <div className="text-sm text-gray-600">
        <p>{errorMessage}</p>
      </div>
      
      {showResetButton && (
        <Button 
          variant="outline" 
          onClick={resetErrorBoundary}
          className="mt-4 border-red-200 hover:bg-red-100 hover:text-red-800 flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default ErrorFallback;
