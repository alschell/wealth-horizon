
import React from "react";  // Explicitly import React
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "./context/OnboardingContext";
import { ThemeProvider } from "./context/ThemeContext";
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
import IntegrationCallback from "./pages/IntegrationCallback";
import TradingInterface from "@/components/trading/TradingInterface";
import NewAdviceInterface from "@/components/advice/NewAdviceInterface";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import Reporting from "./pages/Reporting";
import Notifications from "./pages/Notifications";
import Activity from "./pages/Activity";
import AIAssistantPage from "./pages/AIAssistant";
import FinancialChat from "./pages/FinancialChat";
import Borrow from "./pages/Borrow";
import CreditFacilities from "./pages/CreditFacilities";
import ChatButton from "./components/chat/ChatButton";
import PortfolioScenarios from "./pages/PortfolioScenarios";
import WealthTransfer from "./pages/WealthTransfer";
import EsgAnalysis from "./pages/EsgAnalysis";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        {/* Move TooltipProvider inside React context */}
        <ThemeProvider>
          <OnboardingProvider>
            <BrowserRouter>
              <TooltipProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/onboarding/*" element={<Onboarding />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/*" element={<Dashboard />} />
                  <Route path="/trading" element={<Trading />} />
                  <Route path="/trading/new" element={<TradingInterface />} />
                  <Route path="/trading/edit/:tradeId" element={<TradingInterface />} />
                  <Route path="/advice" element={<Advice />} />
                  <Route path="/advice/new" element={<NewAdviceInterface />} />
                  <Route path="/market-data" element={<MarketData />} />
                  <Route path="/analyze-wealth" element={<AnalyzeWealth />} />
                  <Route path="/cashflow" element={<CashflowManagement />} />
                  <Route path="/integrations" element={<Integrations />} />
                  <Route path="/integrations/oauth-callback" element={<IntegrationCallback />} />
                  <Route path="/dashboard/users" element={<UserManagement />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/reporting" element={<Reporting />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/activity" element={<Activity />} />
                  <Route path="/ai-assistant" element={<AIAssistantPage />} />
                  <Route path="/financial-chat" element={<FinancialChat />} />
                  <Route path="/borrow" element={<Borrow />} />
                  <Route path="/credit-facilities" element={<CreditFacilities />} />
                  <Route path="/portfolio-scenarios" element={<PortfolioScenarios />} />
                  <Route path="/wealth-transfer" element={<WealthTransfer />} />
                  <Route path="/esg-analysis" element={<EsgAnalysis />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
                <Sonner />
                <ChatButton />
              </TooltipProvider>
            </BrowserRouter>
          </OnboardingProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
