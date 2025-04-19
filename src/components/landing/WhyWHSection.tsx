
import React from "react";
import { FadeIn, ScaleIn } from "@/components/ui/animation";
import { CheckCircle, Target, TrendingUp, UserPlus } from "lucide-react";
import TranslatedText from "@/components/ui/translated-text";

const WhyWHSection: React.FC = () => {
  const reasons = [
    {
      title: "Advanced Reporting",
      description: "Create custom reports with detailed insights and easy-to-understand visualizations.",
      icon: <TrendingUp size={28} />
    },
    {
      title: "Compliance Management",
      description: "Stay ahead of regulatory requirements with automated compliance monitoring.",
      icon: <CheckCircle size={28} />
    },
    {
      title: "Comprehensive Dashboard",
      description: "Get a holistic view of your wealth across all your banks, brokers and custodians.",
      icon: <Target size={28} />
    },
    {
      title: "Real-time Analytics",
      description: "Monitor your investments with real-time updates and customizable dashboards.",
      icon: <TrendingUp size={28} />
    },
    {
      title: "Risk Management",
      description: "Identify and mitigate risks with our sophisticated analysis tools.",
      icon: <CheckCircle size={28} />
    },
    {
      title: "Secure Collaboration",
      description: "Invite team members and stakeholders to the platform.",
      icon: <UserPlus size={28} />
    },
    {
      title: "Centralized Asset Management",
      description: "Eliminate data silos and manage all assets, investments, and operations in one unified platform.",
      icon: <Target size={28} />
    },
    {
      title: "Data-Driven Decision Making",
      description: "Leverage advanced analytics and AI-powered insights to make more informed investment decisions.",
      icon: <TrendingUp size={28} />
    },
  ];

  return (
    <section className="py-24 bg-white w-full" id="why-wh">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
              <TranslatedText>Why </TranslatedText>
              <span className="text-indigo-600">Wealth</span>
              <span className="text-gray-900">Horizon</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center">
              <TranslatedText>
                Discover why leading family offices and institutions choose our platform for their wealth management needs
              </TranslatedText>
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <ScaleIn key={index} delay={0.1 * index}>
              <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white text-center">
                <div className="flex items-center gap-2 mb-4 justify-center">
                  <div className="text-indigo-600">
                    {reason.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    <TranslatedText>{reason.title}</TranslatedText>
                  </h3>
                </div>
                <p className="text-gray-600 text-center">
                  <TranslatedText>{reason.description}</TranslatedText>
                </p>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWHSection;
