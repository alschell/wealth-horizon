
import React from "react";
import { BarChart3, Briefcase, Shield, Users, Globe, CheckCircle } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animation";

const features = [
  {
    title: "Comprehensive Portfolio Management",
    description: "Track, analyze, and optimize your entire investment portfolio with real-time data and advanced analytics.",
    icon: <BarChart3 size={24} />,
  },
  {
    title: "Advanced Trading Platform",
    description: "Execute trades, manage allocations, and monitor market movements all in one integrated platform.",
    icon: <Briefcase size={24} />,
  },
  {
    title: "Institutional-Grade Security",
    description: "Enterprise security features with multi-factor authentication and end-to-end encryption for your data.",
    icon: <Shield size={24} />,
  },
  {
    title: "Family Office Management",
    description: "Specialized tools for family offices including entity management, tax planning, and legacy planning.",
    icon: <Users size={24} />,
  },
  {
    title: "Global Investment Coverage",
    description: "Access and analyze investment opportunities across all asset classes and global markets.",
    icon: <Globe size={24} />,
  },
  {
    title: "Compliance Monitoring",
    description: "Automated compliance checks and real-time monitoring to ensure regulatory adherence.",
    icon: <CheckCircle size={24} />,
  },
];

interface FeaturesSectionProps {
  id: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ id }) => {
  return (
    <section id={id} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">One Platform to Replace Them All</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Eliminate disconnected tools and unify your wealth management operations in a single, powerful platform.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <StaggerItem key={index} className="group">
              <div className="h-full p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default FeaturesSection;
