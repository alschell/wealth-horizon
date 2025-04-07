
import React from "react";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from "@/components/ui/animation";
import DashboardAnimation from "@/components/animations/DashboardAnimation";

const features = [
  {
    title: "Comprehensive Dashboard",
    description: "Get a holistic view of your wealth management across all banks and brokers."
  },
  {
    title: "Real-time Analytics",
    description: "Monitor your investments with real-time updates and customizable dashboards."
  },
  {
    title: "Advanced Reporting",
    description: "Create custom reports with detailed insights and easy-to-understand visualizations."
  },
  {
    title: "Compliance Management",
    description: "Stay ahead of regulatory requirements with automated compliance monitoring."
  },
  {
    title: "Risk Management",
    description: "Identify and mitigate risks with our sophisticated analysis tools."
  },
  {
    title: "Secure Collaboration",
    description: "Share documents and insights securely with team members and stakeholders."
  }
];

const FeaturesSection: React.FC<{ id?: string }> = ({ id }) => {
  return (
    <section className="py-24 bg-gray-50" id={id}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Transform Your Wealth Management</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform simplifies complex wealth management with intuitive tools designed for family offices and institutions
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
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
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
