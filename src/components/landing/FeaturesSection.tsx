
import React from "react";
import { FadeIn } from "@/components/ui/animation";
import { TranslatedText } from "@/components/ui/translated-text";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Portfolio Analytics",
      description: "Advanced portfolio analysis with real-time performance tracking and custom benchmarking",
      iconClass: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      title: "Multi-Asset Management",
      description: "Comprehensive management across all asset classes including public, private, and alternative investments",
      iconClass: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      title: "Tax Optimization",
      description: "Sophisticated tax planning tools to maximize after-tax returns across multiple jurisdictions",
      iconClass: "bg-gradient-to-br from-yellow-400 to-yellow-600"
    },
    {
      title: "Wealth Transfer Planning",
      description: "Tools for inheritance planning, succession, and multi-generational wealth preservation",
      iconClass: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
      title: "Real-time Reporting",
      description: "Customizable reporting dashboards with powerful visualization tools and insights",
      iconClass: "bg-gradient-to-br from-red-400 to-red-600"
    },
    {
      title: "Risk Management",
      description: "Advanced risk assessment tools providing stress testing and scenario analysis",
      iconClass: "bg-gradient-to-br from-indigo-400 to-indigo-600"
    }
  ];

  return (
    <section className="py-24 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <TranslatedText>Powerful Features</TranslatedText>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              <TranslatedText>
                Our comprehensive suite of tools designed to optimize every aspect of wealth management
              </TranslatedText>
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                <div className={`w-12 h-12 rounded-lg ${feature.iconClass} mb-6`}></div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  <TranslatedText>{feature.title}</TranslatedText>
                </h3>
                <p className="text-gray-600 flex-grow">
                  <TranslatedText>{feature.description}</TranslatedText>
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
