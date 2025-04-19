import './App.css';

import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { OnboardingProvider } from "./context/OnboardingContext";
import { TranslationProvider } from "./context/TranslationContext";
import Navigation from "./components/Navigation";
import ChatButton from "@/components/chat/ChatButton";
import { AppRoutes } from "./routes/AppRoutes";
import { createQueryClient } from "./utils/queryClient";

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

  useEffect(() => {
    console.log("App component mounted");
    
    const checkBrowserCompatibility = () => {
      const isLocalStorageAvailable = (() => {
        try {
          localStorage.setItem('test', 'test');
          localStorage.removeItem('test');
          return true;
        } catch (e) {
          return false;
        }
      })();
      
      if (!isLocalStorageAvailable) {
        console.warn("LocalStorage is not available - caching functionality will be limited");
      }
      
      if (!window.fetch) {
        console.error("Fetch API is not available in this browser");
      }
      
      if (!window.requestAnimationFrame) {
        console.warn("requestAnimationFrame is not available - animations may not work properly");
      }
    };
    
    checkBrowserCompatibility();
    
    const handleGlobalError = (event: ErrorEvent) => {
      console.error("Global error:", event.error);
      if (!event.error || event.error._reported) return;
      
      if (event.error) {
        Object.defineProperty(event.error, '_reported', { value: true });
      }
    };
    
    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TranslationProvider>
          <OnboardingProvider>
            <TooltipProvider>
              <Navigation />
              <AppRoutes />
              <Toaster />
              <Sonner />
              <ChatButton />
            </TooltipProvider>
          </OnboardingProvider>
        </TranslationProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
