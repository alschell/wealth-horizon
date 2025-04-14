
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  message?: string;
  showReset?: boolean;
}

/**
 * Default error fallback component for use with ErrorBoundary
 */
const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
  message = "Something went wrong",
  showReset = true
}) => {
  return (
    <div className="p-6 mx-auto my-8 bg-white border border-red-200 rounded-lg shadow-sm max-w-2xl">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex items-center justify-center w-12 h-12 text-red-500 bg-red-100 rounded-full">
          <AlertTriangle className="w-6 h-6" />
        </div>
        
        <h2 className="text-xl font-semibold text-gray-800">{message}</h2>
        
        {error && (
          <div className="w-full p-4 mt-4 overflow-auto text-left text-sm bg-gray-50 border border-gray-200 rounded-md">
            <p className="font-medium text-red-600">{error.message}</p>
            {error.stack && (
              <pre className="mt-2 text-xs text-gray-600 whitespace-pre-wrap">
                {error.stack.split('\n').slice(1, 4).join('\n')}
              </pre>
            )}
          </div>
        )}
        
        {showReset && resetErrorBoundary && (
          <Button 
            variant="outline"
            className="mt-4 flex items-center space-x-2"
            onClick={resetErrorBoundary}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorFallback;
