
import React from "react";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from "@/components/ui/animation";
import { LineChart, Shield, BarChart3, FileText, Users, Lock, LucideIcon } from "lucide-react";
import DashboardAnimation from "@/components/animations/DashboardAnimation";
import TranslatedText from "@/components/ui/translated-text";

// Define the features with the correct icon type and sort them alphabetically
const features = [
  {
    title: "Compliance Management",
    description: "Stay ahead of regulatory requirements with automated compliance monitoring.",
    icon: Shield
  },
  {
    title: "Comprehensive Dashboard",
    description: "Get a holistic view of your wealth across all your banks, brokers and custodians.",
    icon: LineChart
  },
  {
    title: "Real-time Analytics",
    description: "Monitor your investments with real-time updates and customizable dashboards.",
    icon: BarChart3
  },
  {
    title: "Risk Management",
    description: "Identify and mitigate risks with our sophisticated analysis tools.",
    icon: BarChart3
  },
  {
    title: "Secure Collaboration",
    description: "Invite team members and stakeholders to the platform.",
    icon: Users
  },
  {
    title: "Advanced Reporting",
    description: "Create custom reports with detailed insights and easy-to-understand visualizations.",
    icon: FileText
  }
].sort((a, b) => a.title.localeCompare(b.title));

interface FeaturesSectionProps {
  id?: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ id }) => {
  return (
    <section className="w-full bg-gray-50 py-24" id={id}>
      <div className="max-w-[1400px] mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
              <TranslatedText>Key Features</TranslatedText>
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto text-center">
              <TranslatedText>
                Our AI-native platform simplifies managing all your wealth with intuitive tools designed for the most sophisticated family offices and institutions
              </TranslatedText>
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
