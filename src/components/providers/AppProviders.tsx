
import { ReactNode } from 'react';
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OnboardingProvider } from "../../context/OnboardingContext";
import { TranslationProvider } from "../../context/TranslationContext";

interface AppProvidersProps {
  children: ReactNode;
  queryClient: any;
}

export function AppProviders({ children, queryClient }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TranslationProvider>
          <OnboardingProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </OnboardingProvider>
        </TranslationProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
