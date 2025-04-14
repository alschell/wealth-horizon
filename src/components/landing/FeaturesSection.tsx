
import React, { useState, useEffect } from "react";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from "@/components/ui/animation";
import { LineChart, Shield, BarChart3, FileText, Users, Lock, LucideIcon } from "lucide-react";
import FeatureAnimation from "@/components/animations/FeatureAnimation";
import { LocalizedText, useLocalizedText } from "@/components/ui/localized-text";
import { useLanguage } from "@/context/LanguageContext";

// Define the features with the correct icon type and sort them alphabetically
const FeaturesSection: React.FC<{ id?: string }> = ({ id }) => {
  const { t } = useLocalizedText();
  const { language } = useLanguage();
  const [, forceUpdate] = useState({});
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`FeaturesSection detected language change to: ${language}`);
    forceUpdate({});
  }, [language]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("FeaturesSection detected language change event");
      forceUpdate({});
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  const features = [
    {
      title: t("complianceManagement", "Compliance Management"),
      description: t("complianceManagementDesc", "Stay ahead of regulatory requirements with automated compliance monitoring."),
      icon: Shield
    },
    {
      title: t("comprehensiveDashboard", "Comprehensive Dashboard"),
      description: t("comprehensiveDashboardDesc", "Get a holistic view of your wealth across all your banks, brokers and custodians."),
      icon: LineChart
    },
    {
      title: t("realTimeAnalytics", "Real-time Analytics"),
      description: t("realTimeAnalyticsDesc", "Monitor your investments with real-time updates and customizable dashboards."),
      icon: BarChart3
    },
    {
      title: t("riskManagement", "Risk Management"),
      description: t("riskManagementDesc", "Identify and mitigate risks with our sophisticated analysis tools."),
      icon: BarChart3
    },
    {
      title: t("secureCollaboration", "Secure Collaboration"),
      description: t("secureCollaborationDesc", "Invite team members and stakeholders to the platform."),
      icon: Users
    },
    {
      title: t("advancedReporting", "Advanced Reporting"),
      description: t("advancedReportingDesc", "Create custom reports with detailed insights and easy-to-understand visualizations."),
      icon: FileText
    }
  ].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <section className="py-24 bg-gray-50" id={id} key={`features-section-${language}`}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <LocalizedText textKey="keyFeatures" fallback="Key Features" />
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              <LocalizedText 
                textKey="keyFeaturesSubtitle" 
                fallback="Our AI-native platform simplifies managing all your wealth with intuitive tools designed for the most sophisticated family offices and institutions" 
              />
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <ScaleIn delay={0.2}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              <div className="relative aspect-[4/3]">
                <FeatureAnimation features={features} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
          </ScaleIn>

          <div>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" delay={0.3}>
              {features.map((feature, index) => (
                <StaggerItem key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 flex items-center justify-center text-indigo-600">
                      <feature.icon size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
