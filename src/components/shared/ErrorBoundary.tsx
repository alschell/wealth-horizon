
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  /**
   * Optional component name for more specific error reporting
   */
  componentName?: string;
  /**
   * Optional callback to be called when an error is caught
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the whole app.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  /**
   * Updates state to indicate an error has been caught
   */
  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  /**
   * Log the error to an error reporting service
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to console
    console.error(
      `ErrorBoundary caught an error in ${this.props.componentName || "component"}:`,
      error,
      errorInfo
    );
    
    // Store error info in state for display
    this.setState({ errorInfo });
    
    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Here you could send the error to an analytics service like Sentry
  }

  /**
   * Reset the error state to allow the component to try rendering again
   */
  private resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    toast({
      title: "Attempting to recover",
      description: "The application is attempting to recover from an error.",
      variant: "default",
    });
  };

  /**
   * Reload the entire page as a last resort
   */
  private reloadPage = () => {
    toast({
      title: "Reloading page",
      description: "The page will reload to recover from the error.",
    });
    
    // Small delay to allow toast to be seen
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  public render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use that
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise use the default fallback UI
      return (
        <motion.div
          className="p-6 flex flex-col items-center justify-center min-h-[200px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          role="alert"
          aria-live="assertive"
        >
          <Alert variant="destructive" className="mb-4 max-w-xl">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="text-lg">Something went wrong</AlertTitle>
            <AlertDescription className="mt-2">
              <p className="mb-2">
                {this.state.error?.message || "An unexpected error occurred."}
              </p>
              
              {this.state.errorInfo && (
                <details className="mt-2 text-xs">
                  <summary className="cursor-pointer text-sm">
                    Technical details
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap bg-gray-800 text-white p-2 rounded overflow-auto max-h-[200px]">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
            <Button 
              onClick={this.resetError} 
              variant="outline"
              className="flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try again
            </Button>
            <Button 
              onClick={this.reloadPage}
              className="flex items-center"
            >
              Reload page
            </Button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

/**
 * HOC to wrap a component with an ErrorBoundary
 */
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) => {
  const displayName = Component.displayName || Component.name || 'Component';
  
  const WrappedComponent: React.FC<P> = (props) => (
    <ErrorBoundary componentName={displayName} {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${displayName})`;
  
  return WrappedComponent;
};

export default ErrorBoundary;
