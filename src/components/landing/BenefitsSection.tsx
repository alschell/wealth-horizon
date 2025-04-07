
import React from "react";
import { BarChart3, Shield } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animation";

const benefits = [
  {
    title: "Centralized Wealth Management",
    description: "Eliminate data silos and manage all assets, investments, and operations in one unified platform.",
    icon: <BarChart3 size={24} />,
  },
  {
    title: "Data-Driven Decision Making",
    description: "Leverage advanced analytics and AI-powered insights to make more informed investment decisions.",
    icon: <BarChart3 size={24} />,
  },
  {
    title: "Operational Efficiency",
    description: "Streamline workflows, automate routine tasks, and reduce manual work to focus on high-value activities.",
    icon: <BarChart3 size={24} />,
  },
  {
    title: "Enterprise-Grade Security",
    description: "Safeguard sensitive financial data with bank-level security, encryption, and access controls.",
    icon: <Shield size={24} />,
  },
];

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Transform Your Wealth Management</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Experience a new level of efficiency, insight, and control with <span className="text-indigo-600">Wealth</span><span className="text-gray-900">Horizon</span>.
            </p>
          </FadeIn>
        </div>

        <div className="mx-auto max-w-4xl">
          <StaggerContainer className="space-y-8">
            {benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
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
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
