
import React from "react";
import { FadeIn } from "@/components/ui/animation";
import { CheckCircle, Shield, TrendingUp, Users } from "lucide-react";
import { LocalizedText, useLocalizedText } from "@/components/ui/localized-text";
import { useLanguage } from "@/context/LanguageContext";

const WhySection: React.FC = () => {
  const { t } = useLocalizedText();
  const { language } = useLanguage();
  const [, forceUpdate] = React.useState({});
  
  // Force re-render when language changes
  React.useEffect(() => {
    console.log(`WhySection detected language change to: ${language}`);
    forceUpdate({});
  }, [language]);
  
  // Listen for language change events
  React.useEffect(() => {
    const handleLanguageChange = () => {
      console.log("WhySection detected language change event");
      forceUpdate({});
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  const reasons = [
    {
      title: t("comprehensiveSolution", "Comprehensive Solution"),
      description: t("comprehensiveSolutionDesc", "Our platform unifies all your financial data across institutions, providing a single source of truth for your wealth."),
      icon: <TrendingUp className="h-7 w-7 text-indigo-600" />,
    },
    {
      title: t("enterpriseSecurity", "Enterprise Security"),
      description: t("enterpriseSecurityDesc", "Bank-level security and encryption protect your sensitive financial data with rigorous access controls."),
      icon: <Shield className="h-7 w-7 text-indigo-600" />,
    },
    {
      title: t("clientCenteredApproach", "Client-Centered Approach"),
      description: t("clientCenteredApproachDesc", "Built specifically for family offices and institutions with the flexibility to adapt to your unique needs."),
      icon: <Users className="h-7 w-7 text-indigo-600" />,
    },
    {
      title: t("aiPoweredInsights", "AI-Powered Insights"),
      description: t("aiPoweredInsightsDesc", "Leverage advanced analytics and AI to uncover opportunities and optimize your wealth management strategy."),
      icon: <CheckCircle className="h-7 w-7 text-indigo-600" />,
    },
  ];

  return (
    <section className="py-24 bg-white" id="why" key={`why-section-${language}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <LocalizedText textKey="whyWealthHorizon" fallback="Why WealthHorizon" />
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              <LocalizedText 
                textKey="whyWealthHorizonSubtitle" 
                fallback="Discover why leading family offices and institutions trust WealthHorizon to manage their wealth" 
              />
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full flex flex-col">
                <div className="mb-4">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-gray-600 flex-grow">{reason.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
