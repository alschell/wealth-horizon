
import './App.css';
import { useEffect, StrictMode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Navigation from "./components/Navigation";
import ChatButton from "@/components/chat/ChatButton";
import { AppRoutes } from "./routes/AppRoutes";
import { createQueryClient } from "./utils/queryClient";
import { AppProviders } from "./components/providers/AppProviders";
import { setupGlobalErrorHandler } from "./utils/errorHandling/globalErrorHandler";
import { useBrowserCompatibility } from "./hooks/useBrowserCompatibility";
import { ErrorBoundary } from "@/components/error-boundary";
import ErrorFallback from "@/components/shared/ErrorFallback";

function App() {
  const queryClient = createQueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        retry: 2,
        retryDelay: attemptIndex => Math.min(1000 * (2 ** attemptIndex), 30000),
        gcTime: 1000 * 60 * 10,
      },
    }
  });

  // Check browser compatibility
  useBrowserCompatibility();

  // Setup global error handling
  useEffect(() => {
    console.log("App component mounted");
    return setupGlobalErrorHandler();
  }, []);

  return (
    <StrictMode>
      <ErrorBoundary
        fallback={<ErrorFallback 
          error={new Error("Application failed to render")}
          resetErrorBoundary={() => window.location.reload()}
          title="Application Error"
          description="We encountered an error while loading the application. Please try refreshing the page."
        />}
      >
        <AppProviders queryClient={queryClient}>
          <Navigation />
          <AppRoutes />
          <Toaster />
          <Sonner />
          <ChatButton />
        </AppProviders>
      </ErrorBoundary>
    </StrictMode>
  );
}

export default App;
