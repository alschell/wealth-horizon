
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  error: Error;
  onRetry: () => void;
}

const ErrorMessage = ({ error, onRetry }: ErrorMessageProps) => {
  return (
    <div className="py-10 text-center">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="h-12 w-12 text-amber-500" />
      </div>
      <h3 className="text-lg font-medium">Failed to load news</h3>
      <p className="text-muted-foreground mt-2 mb-6 max-w-lg mx-auto">
        {error.message || "We couldn't load the latest news. This could be due to a network issue or service unavailability."}
      </p>
      <Button onClick={onRetry}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Retry
      </Button>
    </div>
  );
};

export default ErrorMessage;
