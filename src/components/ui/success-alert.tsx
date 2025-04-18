
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, X } from "lucide-react";
import { TranslatedText } from "@/components/ui/translated-text";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface SuccessAlertProps {
  title?: string;
  message: string;
  autoDismiss?: boolean;
  dismissAfter?: number; // in milliseconds
  onDismiss?: () => void;
  showDismissButton?: boolean;
  className?: string;
  variant?: "default" | "compact" | "toast";
  actionText?: string;
  onAction?: () => void;
}

export function SuccessAlert({
  title = "Success",
  message,
  autoDismiss = false,
  dismissAfter = 5000,
  onDismiss,
  showDismissButton = true,
  className,
  variant = "default",
  actionText,
  onAction,
}: SuccessAlertProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!autoDismiss) return;

    const startTime = Date.now();
    const endTime = startTime + dismissAfter;

    const progressInterval = setInterval(() => {
      const now = Date.now();
      const remainingTime = Math.max(0, endTime - now);
      const progressValue = (remainingTime / dismissAfter) * 100;
      
      setProgress(progressValue);
      
      if (progressValue <= 0) {
        clearInterval(progressInterval);
        handleDismiss();
      }
    }, 100);

    return () => clearInterval(progressInterval);
  }, [autoDismiss, dismissAfter]);

  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!visible) return null;

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 p-2 rounded-md bg-green-50 text-green-800 border border-green-200",
          className
        )}
      >
        <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
        <span className="text-sm">
          <TranslatedText>{message}</TranslatedText>
        </span>
        {showDismissButton && (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 ml-auto text-green-600 hover:text-green-900 hover:bg-green-100"
            onClick={handleDismiss}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Dismiss</span>
          </Button>
        )}
      </div>
    );
  }

  if (variant === "toast") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-md border bg-background p-4 shadow-lg",
          className
        )}
      >
        <div className="flex gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <div className="grid gap-1">
            {title && (
              <AlertTitle>
                <TranslatedText>{title}</TranslatedText>
              </AlertTitle>
            )}
            <AlertDescription>
              <TranslatedText>{message}</TranslatedText>
            </AlertDescription>
            {actionText && onAction && (
              <Button
                variant="link"
                className="px-0 text-sm justify-start h-auto"
                onClick={onAction}
              >
                <TranslatedText>{actionText}</TranslatedText>
              </Button>
            )}
          </div>
          {showDismissButton && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 absolute top-2 right-2 text-muted-foreground"
              onClick={handleDismiss}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Dismiss</span>
            </Button>
          )}
        </div>
        {autoDismiss && (
          <div className="absolute bottom-0 left-0 h-1 bg-green-500" style={{ width: `${progress}%` }} />
        )}
      </div>
    );
  }

  // Default variant
  return (
    <Alert
      className={cn(
        "relative border-green-200 bg-green-50 text-green-800",
        className
      )}
    >
      <CheckCircle2 className="h-5 w-5 text-green-500" />
      {title && (
        <AlertTitle>
          <TranslatedText>{title}</TranslatedText>
        </AlertTitle>
      )}
      <AlertDescription className="text-green-700">
        <TranslatedText>{message}</TranslatedText>
      </AlertDescription>
      
      {actionText && onAction && (
        <div className="mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAction}
            className="border-green-300 bg-green-50 hover:bg-green-100 text-green-800"
          >
            <TranslatedText>{actionText}</TranslatedText>
          </Button>
        </div>
      )}
      
      {showDismissButton && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-6 w-6 text-green-600 hover:bg-green-100 hover:text-green-900"
          onClick={handleDismiss}
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Dismiss</span>
        </Button>
      )}
      
      {autoDismiss && (
        <div className="absolute bottom-0 left-0 h-1 bg-green-500" style={{ width: `${progress}%` }} />
      )}
    </Alert>
  );
}
