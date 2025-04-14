
import React from "react";
import { cn } from "@/lib/utils";
import EnhancedLoadingOverlay from "@/components/common/EnhancedLoadingOverlay";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export interface MarketDataLoaderProps {
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  children: React.ReactNode;
  onRetry?: () => void;
  loadingText?: string;
  className?: string;
  emptyState?: React.ReactNode;
  isEmpty?: boolean;
  loaderSize?: "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * A reusable component to handle loading, error, and empty states for market data
 */
const MarketDataLoader: React.FC<MarketDataLoaderProps> = ({
  isLoading,
  isError,
  error,
  children,
  onRetry,
  loadingText = "Loading market data...",
  className,
  emptyState,
  isEmpty = false,
  loaderSize = "md"
}) => {
  // Error state
  if (isError) {
    return (
      <div className={cn("rounded-lg border p-4", className)}>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error loading market data</AlertTitle>
          <AlertDescription>
            {error?.message || "An unexpected error occurred"}
          </AlertDescription>
          {onRetry && (
            <div className="mt-3">
              <Button variant="outline" size="sm" onClick={onRetry}>
                Try again
              </Button>
            </div>
          )}
        </Alert>
      </div>
    );
  }

  // Empty state
  if (!isLoading && isEmpty && emptyState) {
    return <div className={className}>{emptyState}</div>;
  }

  // Loading and content state
  return (
    <EnhancedLoadingOverlay
      isLoading={isLoading}
      text={loadingText}
      spinnerSize={loaderSize}
      className={className}
    >
      {children}
    </EnhancedLoadingOverlay>
  );
};

export default MarketDataLoader;
