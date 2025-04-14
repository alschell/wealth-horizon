
import React, { useState, useEffect } from "react";
import { BarChart3, Shield, Layers, Clock } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/animation";
import WealthTransformAnimation from "@/components/animations/WealthTransformAnimation";
import { LocalizedText, useLocalizedText } from "@/components/ui/localized-text";
import { useLanguage } from "@/context/LanguageContext";

const BenefitsSection: React.FC = () => {
  const { t } = useLocalizedText();
  const { language } = useLanguage();
  const [, forceUpdate] = useState({});
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`BenefitsSection detected language change to: ${language}`);
    forceUpdate({});
  }, [language]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("BenefitsSection detected language change event");
      forceUpdate({});
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  const benefits = [
    {
      title: t("centralizedAssetManagement", "Centralized Asset Management"),
      description: t("centralizedAssetManagementDesc", "Eliminate data silos and manage all assets, investments, and operations in one unified platform."),
      icon: <Layers size={24} />,
    },
    {
      title: t("dataDrivenDecisionMaking", "Data-Driven Decision Making"),
      description: t("dataDrivenDecisionMakingDesc", "Leverage advanced analytics and AI-powered insights to make more informed investment decisions."),
      icon: <BarChart3 size={24} />,
    },
    {
      title: t("enterpriseGradeSecurity", "Enterprise-Grade Security"),
      description: t("enterpriseGradeSecurityDesc", "Safeguard sensitive financial data with bank-level security, encryption, and access controls."),
      icon: <Shield size={24} />,
    },
    {
      title: t("operationalEfficiency", "Operational Efficiency"),
      description: t("operationalEfficiencyDesc", "Streamline workflows, automate routine tasks, and reduce manual work to focus on high-value activities."),
      icon: <Clock size={24} />,
    },
  ].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <section className="py-24 bg-gray-50" id="benefits" key={`benefits-section-${language}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <LocalizedText textKey="transformYourWealth" fallback="Transform Your Wealth Management" />
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              <LocalizedText 
                textKey="transformYourWealthDesc" 
                fallback="Experience a new level of efficiency, insight, and control with" 
              />{" "}
              <span className="text-indigo-600">Wealth</span>
              <span className="text-gray-900">Horizon</span>.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <StaggerContainer className="space-y-8">
            {benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-gray-50 text-[#4E46DC]">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <ScaleIn delay={0.2}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              <div className="relative aspect-[4/3]">
                <WealthTransformAnimation />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
