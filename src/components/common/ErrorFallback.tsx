
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';

export interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  message?: string;
  showReset?: boolean;
  showDetails?: boolean;
  errorInfo?: React.ErrorInfo;
}

/**
 * Unified error fallback component for use with ErrorBoundary
 * Displays a user-friendly error message with optional reset functionality
 */
const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
  message = "Something went wrong",
  showReset = true,
  showDetails = process.env.NODE_ENV !== 'production',
  errorInfo
}) => {
  return (
    <motion.div
      className="p-6 mx-auto my-8 rounded-lg shadow-sm max-w-2xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="text-lg">{message}</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-2">
            {error?.message || "An unexpected error occurred."}
          </p>
          
          {showDetails && (error || errorInfo) && (
            <details className="mt-2 text-xs">
              <summary className="cursor-pointer text-sm">
                Technical details
              </summary>
              <pre className="mt-2 whitespace-pre-wrap bg-gray-800 text-white p-2 rounded overflow-auto max-h-[200px]">
                {errorInfo?.componentStack || error?.stack?.split('\n').slice(0, 5).join('\n')}
              </pre>
            </details>
          )}
        </AlertDescription>
      </Alert>
      
      {showReset && resetErrorBoundary && (
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
          <Button 
            variant="outline"
            className="flex items-center"
            onClick={resetErrorBoundary}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button 
            className="flex items-center"
            onClick={() => window.location.reload()}
          >
            Reload page
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default ErrorFallback;
