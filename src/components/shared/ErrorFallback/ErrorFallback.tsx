
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary: () => void;
  message?: string;
  showReset?: boolean;
  showDetails?: boolean;
  errorInfo?: React.ErrorInfo;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
  message = "Something went wrong",
  showReset = true,
  showDetails = true,
  errorInfo
}) => {
  return (
    <div role="alert" className="p-6 border border-red-300 rounded-lg bg-red-50 text-red-800 flex flex-col">
      <div className="flex items-center mb-4">
        <AlertTriangle className="w-6 h-6 mr-2" />
        <h3 className="text-lg font-semibold">{message}</h3>
      </div>
      
      {showDetails && error && (
        <div className="mb-4">
          <p className="font-mono text-sm bg-red-100 p-2 rounded">{error.message}</p>
          {error.stack && (
            <details className="mt-2">
              <summary className="cursor-pointer text-sm">View stack trace</summary>
              <pre className="p-2 mt-2 text-xs overflow-auto whitespace-pre-wrap bg-red-100 rounded">
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      )}
      
      {errorInfo && (
        <div className="mb-4">
          <p className="text-sm font-semibold mb-1">Component Stack:</p>
          <pre className="p-2 text-xs overflow-auto whitespace-pre-wrap bg-red-100 rounded">
            {errorInfo.componentStack}
          </pre>
        </div>
      )}
      
      {showReset && (
        <button
          onClick={resetErrorBoundary}
          className="mt-2 self-start flex items-center px-3 py-2 bg-red-200 hover:bg-red-300 transition-colors rounded text-sm"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorFallback;
