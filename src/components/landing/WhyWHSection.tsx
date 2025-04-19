
import React from "react";
import { FadeIn, ScaleIn } from "@/components/ui/animation";
import { Target, TrendingUp, CheckCircle, UserPlus } from "lucide-react";
import TranslatedText from "@/components/ui/translated-text";

const WhyWHSection: React.FC = () => {
  const reasons = [
    {
      title: "Specialized for Family Offices",
      description: "Purpose-built platform addressing the unique needs of family offices and high-net-worth individuals",
      icon: <Target size={28} />
    },
    {
      title: "Holistic Wealth View",
      description: "Comprehensive visibility across all assets, accounts, and jurisdictions in one unified platform",
      icon: <TrendingUp size={28} />
    },
    {
      title: "Institutional-Grade Technology",
      description: "Enterprise-level security, compliance, and analytics tools previously only available to large institutions",
      icon: <CheckCircle size={28} />
    },
    {
      title: "Collaborative Platform",
      description: "Seamlessly connect with advisors, family members, and financial professionals in a secure environment",
      icon: <UserPlus size={28} />
    }
  ];

  return (
    <section className="py-24 bg-white" id="why-wh">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <ScaleIn key={index} delay={0.1 * index}>
              <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  <TranslatedText>{reason.title}</TranslatedText>
                </h3>
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
