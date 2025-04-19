
import React from "react";
import { Search, Wallet, Database, FileText, Shield } from "lucide-react";
import TranslatedText from "@/components/ui/translated-text";
import { FadeIn, ScaleIn } from "@/components/ui/animation";

const features = [
  {
    title: "Identify opportunities",
    description: "Leverage advanced portfolio tools and benchmarks for in-depth insights. Effortlessly assess your financial health and make strategic decisions aligned with your financial objectives.",
    icon: Search
  },
  {
    title: "Optimize your liquidity and place term deposits",
    description: "Enhance your liquidity management with advanced tools designed for effective cash flow monitoring. Strategically allocate term deposits to optimize returns while ensuring you maintain the liquidity necessary for immediate operational needs.",
    icon: Wallet
  },
  {
    title: "Access market data and news",
    description: "Stay informed with up-to-the-minute market data and news. Access critical, real-time information to make informed investment decisions quickly and confidently.",
    icon: Database
  },
  {
    title: "Manage your financial data",
    description: "Take control and ownership of your data. Manage user access with granular, role-based permissions to ensure security. Share your data securely, temporarily or permanently, internally or with third parties as needed.",
    icon: Database
  },
  {
    title: "Create customized reports",
    description: "Seamlessly create comprehensive financial reports and statements that meet the specific needs of your organization. Track performance trends, assess your financial standing and facilitate clear communication with stakeholders using visually engaging summaries.",
    icon: FileText
  },
  {
    title: "Monitor risks and stay compliant",
    description: "Seamlessly monitor and manage financial risks while staying compliant with regulatory standards. Identify potential risks, track compliance requirements, and receive clear, actionable insights tailored to your needs.",
    icon: Shield
  }
];

// Reorder the features for the desired 2-column layout
const orderedFeatures = [
  features[0], // Identify opportunities
  features[1], // Optimize your liquidity
  features[2], // Access market data
  features[3], // Manage your financial data
  features[4], // Create customized reports
  features[5], // Monitor risks
];

interface FeaturesSectionProps {
  id?: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ id }) => {
  return (
    <section className="py-24 bg-gray-50" id={id}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            <TranslatedText>Transform Your Wealth Management</TranslatedText>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center">
            <TranslatedText>
              Experience a new level of efficiency, insight, and control with WealthHorizon
            </TranslatedText>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {orderedFeatures.map((feature, index) => (
            <ScaleIn key={index} delay={0.1 * index}>
              <div 
                className="p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white h-full flex flex-col"
              >
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 text-left">
                  <TranslatedText>{feature.title}</TranslatedText>
                </h3>
                <p className="text-gray-600 leading-relaxed flex-grow text-left">
                  <TranslatedText>{feature.description}</TranslatedText>
                </p>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
