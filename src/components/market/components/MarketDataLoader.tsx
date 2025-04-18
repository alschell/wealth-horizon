
import React from "react";
import { cn } from "@/lib/utils";
import EnhancedLoadingOverlay from "@/components/common/EnhancedLoadingOverlay";
import { AlertTriangle, RefreshCw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TranslatedText } from "@/components/ui/translated-text";

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
  /** When the data was last updated (optional) */
  lastUpdated?: Date | null;
  /** Whether data is currently being refreshed */
  isRefreshing?: boolean;
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
  loaderSize = "md",
  lastUpdated = null,
  isRefreshing = false
}) => {
  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return date.toLocaleString();
    }
  };

  // Error state with improved error messages
  if (isError) {
    let errorMessage = "An unexpected error occurred";
    let errorDetails = "";
    
    if (error) {
      if (error.name === "NetworkError" || error.message.includes("network")) {
        errorMessage = "Network connection issue";
        errorDetails = "Please check your internet connection and try again.";
      } else if (error.message.includes("timeout") || error.message.includes("timed out")) {
        errorMessage = "Request timed out";
        errorDetails = "The server took too long to respond. Please try again later.";
      } else if (error.message.includes("401") || error.message.includes("unauthorized")) {
        errorMessage = "Authentication error";
        errorDetails = "Your session may have expired. Please log in again.";
      } else if (error.message.includes("403") || error.message.includes("forbidden")) {
        errorMessage = "Access denied";
        errorDetails = "You don't have permission to access this market data.";
      } else if (error.message.includes("404") || error.message.includes("not found")) {
        errorMessage = "Resource not found";
        errorDetails = "The requested market data is unavailable.";
      } else if (error.message.includes("500")) {
        errorMessage = "Server error";
        errorDetails = "There's an issue with our server. Our team has been notified.";
      } else {
        errorMessage = "Error loading market data";
        errorDetails = error.message || "An unexpected error occurred while loading data.";
      }
    }

    return (
      <div className={cn("rounded-lg border p-4", className)}>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle><TranslatedText>{errorMessage}</TranslatedText></AlertTitle>
          <AlertDescription>
            <TranslatedText>{errorDetails}</TranslatedText>
          </AlertDescription>
          {onRetry && (
            <div className="mt-3">
              <Button variant="outline" size="sm" onClick={onRetry}>
                <RefreshCw className="h-3 w-3 mr-2" />
                <TranslatedText>Try again</TranslatedText>
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

  // Last updated indicator
  const LastUpdatedInfo = lastUpdated && !isLoading && (
    <div className="text-xs text-muted-foreground flex items-center mt-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>
                {isRefreshing ? "Refreshing..." : formatLastUpdated(lastUpdated)}
              </span>
              {isRefreshing && (
                <RefreshCw className="ml-1 h-3 w-3 animate-spin" />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Last updated at {lastUpdated.toLocaleTimeString()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  // Loading and content state
  return (
    <div className={cn("relative", className)}>
      <EnhancedLoadingOverlay
        isLoading={isLoading}
        loadingText={loadingText}
        spinnerSize={loaderSize}
      >
        {children}
      </EnhancedLoadingOverlay>
      
      {LastUpdatedInfo}
      
      {isRefreshing && !isLoading && (
        <div className="absolute top-0 right-0 p-1">
          <div className="flex items-center text-xs bg-primary/10 text-primary rounded px-2 py-1">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
            <span>Refreshing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketDataLoader;
