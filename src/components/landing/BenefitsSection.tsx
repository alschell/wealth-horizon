
import React from "react";
import { BarChart3, Shield, Layers, Clock } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/animation";
import DashboardAnimation from "@/components/animations/DashboardAnimation";
import TranslatedText from "@/components/ui/translated-text";

const benefits = [
  {
    title: "Centralized Asset Management",
    description: "Eliminate data silos and manage all assets, investments, and operations in one unified platform.",
    icon: <Layers size={24} />,
  },
  {
    title: "Data-Driven Decision Making",
    description: "Leverage advanced analytics and AI-powered insights to make more informed investment decisions.",
    icon: <BarChart3 size={24} />,
  },
  {
    title: "Enterprise-Grade Security",
    description: "Safeguard sensitive financial data with bank-level security, encryption, and access controls.",
    icon: <Shield size={24} />,
  },
  {
    title: "Operational Efficiency",
    description: "Streamline workflows, automate routine tasks, and reduce manual work to focus on high-value activities.",
    icon: <Clock size={24} />,
  }
].sort((a, b) => a.title.localeCompare(b.title));

const BenefitsSection: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 py-24" id="benefits">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <TranslatedText>Transform Your Wealth Management</TranslatedText>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              <TranslatedText>Experience a new level of efficiency, insight, and control with </TranslatedText>
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      <TranslatedText>{benefit.title}</TranslatedText>
                    </h3>
                    <p className="text-gray-600">
                      <TranslatedText>{benefit.description}</TranslatedText>
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <ScaleIn delay={0.2}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              <div className="relative aspect-[4/3]">
                <DashboardAnimation />
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
