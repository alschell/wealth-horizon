
import React from "react";  // Explicitly import React
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "./context/OnboardingContext";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard"; 
import Trading from "./pages/Trading";
import Advice from "./pages/Advice";
import MarketData from "./pages/MarketData";
import AnalyzeWealth from "./pages/AnalyzeWealth";
import AssetDetail from "./pages/AssetDetail";
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
import ChatButton from "@/components/chat/ChatButton";
import ESG from "./pages/ESG";
import ClientPortal from "./pages/ClientPortal";
import Documents from "./pages/Documents";
import TaxOptimization from "./pages/TaxOptimization";
import LegacyPlanning from "./pages/LegacyPlanning";
import EntityManagement from "./pages/EntityManagement";
import ComplianceMonitoring from "./pages/ComplianceMonitoring";
import Logout from "./pages/Logout";
import Calendar from "./pages/Calendar";
import Contact from "./pages/Contact";
import LegacyPage from "./pages/LegacyPages";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

function App() {
  // Create a query client inside the component
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <OnboardingProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Navigation />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
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
              <Route path="/analyze-wealth/asset/:assetId" element={<AssetDetail />} />
              <Route path="/cashflow-management" element={<CashflowManagement />} />
              <Route path="/cashflow" element={<CashflowManagement />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/integrations/oauth-callback" element={<IntegrationCallback />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/dashboard/users" element={<UserManagement />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/reporting" element={<Reporting />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/ai-assistant" element={<AIAssistantPage />} />
              <Route path="/financial-chat" element={<FinancialChat />} />
              <Route path="/borrow" element={<Borrow />} />
              <Route path="/credit-facilities" element={<CreditFacilities />} />
              <Route path="/esg" element={<ESG />} />
              <Route path="/client-portal" element={<ClientPortal />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/tax-optimization" element={<TaxOptimization />} />
              <Route path="/legacy-planning" element={<LegacyPlanning />} />
              <Route path="/entity-management" element={<EntityManagement />} />
              <Route path="/compliance-monitoring" element={<ComplianceMonitoring />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Footer link pages */}
              <Route path="/careers" element={<LegacyPage />} />
              <Route path="/blog" element={<LegacyPage />} />
              <Route path="/press" element={<LegacyPage />} />
              <Route path="/documentation" element={<LegacyPage />} />
              <Route path="/help-center" element={<LegacyPage />} />
              <Route path="/security" element={<LegacyPage />} />
              <Route path="/privacy-policy" element={<LegacyPage />} />
              <Route path="/terms-of-service" element={<LegacyPage />} />
              <Route path="/cookies-policy" element={<LegacyPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
            <ChatButton />
          </TooltipProvider>
        </BrowserRouter>
      </OnboardingProvider>
    </QueryClientProvider>
  );
}

export default App;
