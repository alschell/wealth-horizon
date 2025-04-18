
import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, RefreshCw, ExternalLink, HelpCircle, ArrowLeft, Home } from "lucide-react";
import { TranslatedText } from "@/components/ui/translated-text";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export type ErrorSeverity = "low" | "medium" | "high" | "critical";
export type ErrorRecoveryAction = {
  label: string;
  action: () => void;
  icon?: React.ReactNode;
  primary?: boolean;
};

interface ErrorRecoveryProps {
  title?: string;
  message: string;
  severity?: ErrorSeverity;
  className?: string;
  variant?: "inline" | "card" | "fullpage";
  actions?: ErrorRecoveryAction[];
  details?: string;
  errorCode?: string;
  helpLink?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
  onGoHome?: () => void;
}

export function ErrorRecovery({
  title,
  message,
  severity = "medium",
  className,
  variant = "inline",
  actions = [],
  details,
  errorCode,
  helpLink,
  onRetry,
  onGoBack,
  onGoHome,
}: ErrorRecoveryProps) {
  // Generate default title based on severity if not provided
  const defaultTitle = (() => {
    switch (severity) {
      case "low": return "Minor Issue";
      case "medium": return "Error Occurred";
      case "high": return "Significant Error";
      case "critical": return "Critical Error";
      default: return "Error";
    }
  })();

  // Combine explicitly provided actions with standard ones
  const allActions = [...actions];
  
  if (onRetry && !allActions.some(a => a.label.includes("Try again") || a.label.includes("Retry"))) {
    allActions.push({
      label: "Try again",
      action: onRetry,
      icon: <RefreshCw className="h-4 w-4 mr-2" />,
      primary: true
    });
  }
  
  if (onGoBack && !allActions.some(a => a.label.includes("Back") || a.label.includes("Previous"))) {
    allActions.push({
      label: "Go back",
      action: onGoBack,
      icon: <ArrowLeft className="h-4 w-4 mr-2" />
    });
  }
  
  if (onGoHome && !allActions.some(a => a.label.includes("Home"))) {
    allActions.push({
      label: "Go to home",
      action: onGoHome,
      icon: <Home className="h-4 w-4 mr-2" />
    });
  }
  
  if (helpLink && !allActions.some(a => a.label.includes("help") || a.label.includes("Help"))) {
    allActions.push({
      label: "Get help",
      action: () => window.open(helpLink, '_blank'),
      icon: <HelpCircle className="h-4 w-4 mr-2" />
    });
  }

  // Inline variant (Alert-based)
  if (variant === "inline") {
    return (
      <Alert 
        variant="destructive" 
        className={cn(
          severity === "low" && "bg-amber-50 border-amber-200 text-amber-800",
          severity === "medium" && "bg-red-50 border-red-200 text-red-800",
          severity === "high" && "bg-red-100 border-red-300 text-red-900",
          severity === "critical" && "bg-red-200 border-red-400 text-red-900",
          className
        )}
      >
        <AlertTriangle className={cn(
          "h-4 w-4",
          severity === "low" && "text-amber-600",
          severity === "medium" && "text-red-600",
          severity === "high" && "text-red-700",
          severity === "critical" && "text-red-800"
        )} />
        <AlertTitle><TranslatedText>{title || defaultTitle}</TranslatedText></AlertTitle>
        <AlertDescription>
          <TranslatedText>{message}</TranslatedText>
          
          {details && (
            <details className="mt-2 text-sm">
              <summary className="cursor-pointer">Show details</summary>
              <div className="mt-2 p-2 bg-background/40 rounded text-sm whitespace-pre-wrap">
                {details}
              </div>
            </details>
          )}
          
          {errorCode && (
            <div className="mt-1 text-xs">
              Error code: <code className="font-mono">{errorCode}</code>
            </div>
          )}
          
          {allActions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {allActions.map((action, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={action.primary ? "default" : "outline"}
                  onClick={action.action}
                  className={cn(
                    severity === "low" && action.primary && "bg-amber-600 hover:bg-amber-700",
                    severity === "medium" && action.primary && "bg-red-600 hover:bg-red-700",
                    severity === "high" && action.primary && "bg-red-600 hover:bg-red-700", 
                    severity === "critical" && action.primary && "bg-red-700 hover:bg-red-800",
                    !action.primary && severity === "low" && "border-amber-300 text-amber-700 hover:bg-amber-100",
                    !action.primary && severity === "medium" && "border-red-300 text-red-700 hover:bg-red-100",
                    !action.primary && severity === "high" && "border-red-400 text-red-800 hover:bg-red-100",
                    !action.primary && severity === "critical" && "border-red-500 text-red-900 hover:bg-red-200"
                  )}
                >
                  {action.icon}
                  <TranslatedText>{action.label}</TranslatedText>
                </Button>
              ))}
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  // Card variant
  if (variant === "card") {
    return (
      <Card className={cn("border-red-200", className)}>
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <AlertTriangle className={cn(
              "h-5 w-5 mr-2",
              severity === "low" && "text-amber-500", 
              severity === "medium" && "text-red-500",
              severity === "high" && "text-red-600",
              severity === "critical" && "text-red-700"
            )} />
            <CardTitle><TranslatedText>{title || defaultTitle}</TranslatedText></CardTitle>
          </div>
          <CardDescription>
            <TranslatedText>{message}</TranslatedText>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {details && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-1">Error details:</h4>
              <div className="text-sm bg-muted/50 p-3 rounded whitespace-pre-wrap font-mono text-xs">
                {details}
              </div>
            </div>
          )}
          
          {errorCode && (
            <div className="mb-4 text-sm">
              <strong>Error code:</strong> <code className="font-mono bg-muted/50 px-1 py-0.5 rounded">{errorCode}</code>
            </div>
          )}
        </CardContent>
        
        {allActions.length > 0 && (
          <CardFooter className="flex flex-wrap gap-2 border-t pt-4">
            {allActions.map((action, index) => (
              <Button
                key={index}
                size="sm"
                variant={action.primary ? "default" : "outline"}
                onClick={action.action}
              >
                {action.icon}
                <TranslatedText>{action.label}</TranslatedText>
              </Button>
            ))}
          </CardFooter>
        )}
      </Card>
    );
  }

  // Full page variant
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6">
      <div className={cn("w-full max-w-md text-center", className)}>
        <div className="mb-6">
          <div className={cn(
            "mx-auto flex h-20 w-20 items-center justify-center rounded-full",
            severity === "low" && "bg-amber-100", 
            severity === "medium" && "bg-red-100",
            severity === "high" && "bg-red-200",
            severity === "critical" && "bg-red-300"
          )}>
            <AlertTriangle className={cn(
              "h-10 w-10",
              severity === "low" && "text-amber-600",
              severity === "medium" && "text-red-600",
              severity === "high" && "text-red-700",
              severity === "critical" && "text-red-800"
            )} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold tracking-tight mb-2">
          <TranslatedText>{title || defaultTitle}</TranslatedText>
        </h2>
        
        <p className="text-muted-foreground mb-6">
          <TranslatedText>{message}</TranslatedText>
        </p>
        
        {details && (
          <details className="mb-6 text-left bg-muted/30 p-4 rounded-md">
            <summary className="cursor-pointer font-medium mb-2">Technical details</summary>
            <div className="text-sm bg-muted/50 p-3 rounded whitespace-pre-wrap font-mono">
              {details}
            </div>
          </details>
        )}
        
        {errorCode && (
          <div className="mb-6 text-sm text-muted-foreground">
            Error reference: <code className="font-mono bg-muted/50 px-2 py-1 rounded">{errorCode}</code>
          </div>
        )}
        
        <Separator className="my-6" />
        
        <div className="flex flex-col space-y-2">
          {allActions.map((action, index) => (
            <Button
              key={index}
              variant={action.primary ? "default" : "outline"}
              onClick={action.action}
              className={action.primary ? "font-medium" : ""}
            >
              {action.icon}
              <TranslatedText>{action.label}</TranslatedText>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
