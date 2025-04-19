
import React from "react";
import { FadeIn, ScaleIn } from "@/components/ui/animation";
import { Layers, Zap, Building2, Brain } from "lucide-react";
import TranslatedText from "@/components/ui/translated-text";

const WhyWHSection: React.FC = () => {
  const reasons = [
    {
      title: "Holistic Wealth Management",
      description: "Efficiently manage all your assets across multiple financial institutions in one centralized platform. WealthHorizon consolidates your entire portfolio, streamlining the complexities of navigating disparate banking systems, providing a unified view of your wealth.",
      icon: <Layers size={28} />
    },
    {
      title: "Actionable Assets",
      description: "Go beyond mere data aggregation—take action on your wealth directly through our platform. WealthHorizon empowers you to trade, access lending and advice services seamlessly, transforming passive data into proactive financial opportunities.",
      icon: <Zap size={28} />
    },
    {
      title: "Modular Approach",
      description: "Customize your experience with the providers and services that best suit your needs. Our flexible platform allows you to integrate your preferred financial and technology partners, granting you complete control over your wealth management experience without disrupting existing relationships.",
      icon: <Building2 size={28} />
    },
    {
      title: "AI-native Platform",
      description: "Access an unprecedented level of automation and insights, with AI-driven recommendations executed at the click of a button. WealthHorizon was established to help family offices and institutions leverage the latest cutting-edge technologies, delivering the most sophisticated wealth management solution available today.",
      icon: <Brain size={28} />
    }
  ];

  return (
    <section className="py-24 bg-white" id="benefits">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-left">
              <TranslatedText>Why </TranslatedText><span className="text-indigo-600">Wealth</span><span className="text-gray-900">Horizon</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl text-left">
              <TranslatedText>
                Discover why leading family offices and institutions choose our platform
                for their wealth management needs
              </TranslatedText>
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <ScaleIn key={index} delay={0.1 * index}>
              <div className="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white h-full flex flex-col">
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 text-left">
                  <TranslatedText>{reason.title}</TranslatedText>
                </h3>
                <p className="text-gray-600 leading-relaxed flex-grow text-left">
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
