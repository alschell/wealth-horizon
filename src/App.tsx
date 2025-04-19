
import './App.css';
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Navigation from "./components/Navigation";
import ChatButton from "@/components/chat/ChatButton";
import { AppRoutes } from "./routes/AppRoutes";
import { createQueryClient } from "./utils/queryClient";
import { AppProviders } from "./components/providers/AppProviders";
import { setupGlobalErrorHandler } from "./utils/errorHandling/globalErrorHandler";
import { useBrowserCompatibility } from "./hooks/useBrowserCompatibility";

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
    <AppProviders queryClient={queryClient}>
      <Navigation />
      <AppRoutes />
      <Toaster />
      <Sonner />
      <ChatButton />
    </AppProviders>
  );
}

export default App;
