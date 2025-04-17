
import React from 'react';
import { ErrorFallbackProps } from './ErrorFallbackProps';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Fallback component for error boundaries
 */
const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetErrorBoundary,
  title = "Something went wrong",
  message,
  showReset = true,
  resetText = "Try again",
  showDetails = true,
  errorInfo
}) => {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-5 w-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <div className="mt-2">
          <p className="text-sm">{message || error.message || "An unexpected error occurred."}</p>
          
          {showDetails && errorInfo && (
            <div className="mt-2 text-xs">
              <p>Component Stack:</p>
              <pre className="overflow-auto max-h-[100px] bg-gray-100 p-2 rounded text-xs mt-1">
                {errorInfo.componentStack}
              </pre>
            </div>
          )}
          
          {showReset && resetErrorBoundary && (
            <Button 
              variant="outline" 
              onClick={resetErrorBoundary} 
              className="mt-3 flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              {resetText}
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorFallback;
