
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { BarChart3, Layers, ArrowUpRight, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TranslatedText } from "@/components/ui/translated-text";

const PortfolioManagement = () => {
  const features = [
    {
      title: "Advanced Analytics",
      description: "Leverage sophisticated analytics tools for performance attribution, risk assessment, and scenario analysis.",
      icon: BarChart3,
    },
    {
      title: "Compliance Integration",
      description: "Ensure adherence to investment mandates and regulatory requirements with built-in compliance monitoring.",
      icon: Shield,
    },
    {
      title: "Multi-Asset Management",
      description: "Seamlessly manage investments across equities, fixed income, alternatives, real estate, and private market assets.",
      icon: Layers,
    },
    {
      title: "Strategic Rebalancing",
      description: "Implement efficient portfolio rebalancing strategies with automated tools and customizable rules.",
      icon: ArrowUpRight,
    },
  ].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <PageTemplate
      title={<TranslatedText>Portfolio Management</TranslatedText>}
      description={<TranslatedText>Comprehensive tools and features for managing diverse investment portfolios with precision and insight.</TranslatedText>}
      icon={BarChart3}
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            <TranslatedText>Holistic Portfolio Oversight</TranslatedText>
          </h2>
          <p className="text-gray-600 mb-4">
            <TranslatedText>
              Gain a complete view of your investment landscape with our integrated portfolio management solution.
              WealthHorizon provides family offices and institutions with powerful tools to monitor, analyze, and 
              optimize diversified portfolios across multiple asset classes and jurisdictions.
            </TranslatedText>
          </p>
          <p className="text-gray-600">
            <TranslatedText>
              Our platform centralizes all portfolio data, providing real-time insights and visualizations
              that enable more informed investment decisions and strategic planning.
            </TranslatedText>
          </p>
        </section>

        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            <TranslatedText>Key Features</TranslatedText>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <feature.icon size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    <TranslatedText>{feature.title}</TranslatedText>
                  </h3>
                </div>
                <p className="text-gray-600">
                  <TranslatedText>{feature.description}</TranslatedText>
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default PortfolioManagement;
