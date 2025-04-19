import React from "react";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from "@/components/ui/animation";
import { LineChart, Shield, BarChart3, FileText, Users, Lock } from "lucide-react";
import DashboardAnimation from "@/components/animations/DashboardAnimation";
import TranslatedText from "@/components/ui/translated-text";

const features = [
  {
    title: "Identify opportunities",
    description: "Leverage advanced portfolio tools and benchmarks for in-depth insights. Effortlessly assess your financial health and make strategic decisions aligned with your financial objectives.",
    icon: LineChart
  },
  {
    title: "Optimize your liquidity",
    description: "Enhance your liquidity management with advanced tools designed for effective cash flow monitoring. Strategically allocate term deposits to optimize returns while ensuring you maintain the liquidity necessary for immediate operational needs.",
    icon: BarChart3
  },
  {
    title: "Access market data and news",
    description: "Stay informed with up-to-the-minute market data and news. Access critical, real-time information to make informed investment decisions quickly and confidently.",
    icon: FileText
  },
  {
    title: "Manage your financial data",
    description: "Take control and ownership of your data. Manage user access with granular, role-based permissions to ensure security. Share your data securely, temporarily or permanently, internally or with third parties as needed.",
    icon: Shield
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

interface FeaturesSectionProps {
  id?: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ id }) => {
  return (
    <section className="py-24 bg-gray-50" id={id}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <TranslatedText>Transform Your Wealth Management</TranslatedText>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              <TranslatedText>Experience a new level of efficiency, insight, and control with </TranslatedText>
              <span className="text-indigo-600">Wealth</span>
              <span className="text-gray-900">Horizon</span>
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <ScaleIn delay={0.2}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              <div className="relative aspect-[4/3]">
                <DashboardAnimation />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
          </ScaleIn>

          <div>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" delay={0.3}>
              {features.map((feature, index) => (
                <StaggerItem key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 flex items-center justify-center text-indigo-600">
                      <feature.icon size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      <TranslatedText>{feature.title}</TranslatedText>
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    <TranslatedText>{feature.description}</TranslatedText>
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
