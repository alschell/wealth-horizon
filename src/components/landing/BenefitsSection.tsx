
import React from "react";
import { FadeIn } from "@/components/ui/animation";
import { TranslatedText } from "@/components/ui/translated-text";

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: "Increased Efficiency",
      description: "Automate routine tasks and streamline workflows to save time and reduce operational costs",
      percentage: "47%",
      metric: "reduction in administrative tasks"
    },
    {
      title: "Enhanced Decision Making",
      description: "Gain deeper insights through advanced analytics and comprehensive data visualization",
      percentage: "68%",
      metric: "of clients report improved investment decisions"
    },
    {
      title: "Consolidated Reporting",
      description: "Access all your financial information in one place with customizable reporting tools",
      percentage: "92%",
      metric: "reduction in reporting time"
    }
  ];

  return (
    <section className="py-24 bg-white" id="benefits">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <TranslatedText>Measurable Benefits</TranslatedText>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              <TranslatedText>
                Real results our clients experience after implementing WealthHorizon
              </TranslatedText>
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <div className="p-8 border border-gray-100 rounded-xl bg-white h-full flex flex-col">
                <div className="text-4xl font-bold text-indigo-600 mb-4">{benefit.percentage}</div>
                <p className="text-sm text-gray-500 mb-6">
                  <TranslatedText>{benefit.metric}</TranslatedText>
                </p>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  <TranslatedText>{benefit.title}</TranslatedText>
                </h3>
                <p className="text-gray-600 flex-grow">
                  <TranslatedText>{benefit.description}</TranslatedText>
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
