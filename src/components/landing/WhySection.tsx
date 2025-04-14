
import React from "react";
import { FadeIn } from "@/components/ui/animation";
import { CheckCircle, Shield, TrendingUp, Users } from "lucide-react";

const WhySection: React.FC = () => {
  const reasons = [
    {
      title: "Comprehensive Solution",
      description: "Our platform unifies all your financial data across institutions, providing a single source of truth for your wealth.",
      icon: <TrendingUp className="h-7 w-7 text-indigo-600" />,
    },
    {
      title: "Enterprise Security",
      description: "Bank-level security and encryption protect your sensitive financial data with rigorous access controls.",
      icon: <Shield className="h-7 w-7 text-indigo-600" />,
    },
    {
      title: "Client-Centered Approach",
      description: "Built specifically for family offices and institutions with the flexibility to adapt to your unique needs.",
      icon: <Users className="h-7 w-7 text-indigo-600" />,
    },
    {
      title: "AI-Powered Insights",
      description: "Leverage advanced analytics and AI to uncover opportunities and optimize your wealth management strategy.",
      icon: <CheckCircle className="h-7 w-7 text-indigo-600" />,
    },
  ];

  return (
    <section className="py-24 bg-white" id="why">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why WealthHorizon</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why leading family offices and institutions trust WealthHorizon to manage their wealth
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
