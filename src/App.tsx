
import React from "react";  // Explicitly import React
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "./context/OnboardingContext";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Trading from "./pages/Trading";
import Advice from "./pages/Advice";
import MarketData from "./pages/MarketData";
import AnalyzeWealth from "./pages/AnalyzeWealth";
import Index from "./pages/Index";
import CashflowManagement from "./pages/CashflowManagement";
import Integrations from "./pages/Integrations";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        {/* Move TooltipProvider inside React context */}
        <OnboardingProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/onboarding/*" element={<Onboarding />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/trading" element={<Trading />} />
                <Route path="/advice" element={<Advice />} />
                <Route path="/market-data" element={<MarketData />} />
                <Route path="/analyze-wealth" element={<AnalyzeWealth />} />
                <Route path="/cashflow" element={<CashflowManagement />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </BrowserRouter>
        </OnboardingProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
