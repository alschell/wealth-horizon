
import React, { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "./context/OnboardingContext";
import { TranslationProvider } from "./context/TranslationContext";
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
import LegacyPage from "./pages/LegacyPages";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

// Import new pages
import About from "./pages/About";
import PortfolioManagement from "./pages/PortfolioManagement";
import Blog from "./pages/Blog";
import Press from "./pages/Press";
import Careers from "./pages/Careers";
import CareersFAQ from "./pages/CareersFAQ";
import JobDetail from "./pages/JobDetail";
import Documentation from "./pages/Documentation";
import HelpCenter from "./pages/HelpCenter";
import Security from "./pages/Security";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Team from "./pages/Team";

// Import new documentation and developer portal pages
import ApiDocumentation from "./pages/ApiDocumentation";
import SDKDownload from "./pages/SDKDownload";
import DeveloperPortal from "./pages/DeveloperPortal";

// Import newly created help center related pages
import UserGuides from "./pages/UserGuides";
import SupportTicket from "./pages/SupportTicket";
import CommunityForum from "./pages/CommunityForum";
import { createQueryClient } from "./utils/queryClient";

function App() {
  // Create a query client with robust error handling
  const queryClient = createQueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 2,
        retryDelay: attemptIndex => Math.min(1000 * (2 ** attemptIndex), 30000),
        gcTime: 1000 * 60 * 10, // 10 minutes
      },
    }
  });

  // Add debugging to identify when App renders
  useEffect(() => {
    console.log("App component mounted");
    
    // Basic platform health check
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
      
      // Check for other critical browser features
      if (!window.fetch) {
        console.error("Fetch API is not available in this browser");
      }
      
      if (!window.requestAnimationFrame) {
        console.warn("requestAnimationFrame is not available - animations may not work properly");
      }
    };
    
    checkBrowserCompatibility();
    
    // Error handling for uncaught errors
    const handleGlobalError = (event: ErrorEvent) => {
      console.error("Global error:", event.error);
      // Avoid infinite loops of error reporting
      if (!event.error || event.error._reported) return;
      
      // Mark as reported to prevent duplicate reporting
      if (event.error) {
        Object.defineProperty(event.error, '_reported', { value: true });
      }
    };
    
    window.addEventListener('error', handleGlobalError);
    
    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TranslationProvider>
          <OnboardingProvider>
            <TooltipProvider>
              <Navigation />
              <Routes>
                <Route path="/" element={<Index />} />
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
                
                {/* New routes for footer links */}
                <Route path="/about" element={<About />} />
                <Route path="/portfolio-management" element={<PortfolioManagement />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/careers/:id" element={<JobDetail />} />
                <Route path="/careers/faq" element={<CareersFAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/press" element={<Press />} />
                <Route path="/team" element={<Team />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/security" element={<Security />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                
                {/* New documentation and developer portal routes */}
                <Route path="/api-docs" element={<ApiDocumentation />} />
                <Route path="/api-docs/:docType" element={<ApiDocumentation />} />
                <Route path="/sdk/download/:sdkName/:version" element={<SDKDownload />} />
                <Route path="/developer-portal" element={<DeveloperPortal />} />
                <Route path="/developer-portal/:section" element={<DeveloperPortal />} />
                
                {/* New help center related pages */}
                <Route path="/user-guides" element={<UserGuides />} />
                <Route path="/support-ticket" element={<SupportTicket />} />
                <Route path="/community-forum" element={<CommunityForum />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
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
