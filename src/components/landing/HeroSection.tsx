
import React from "react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/animation";
import { CheckCircle } from "lucide-react";
import DashboardAnimation from "@/components/animations/DashboardAnimation";

interface HeroSectionProps {
  onScrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToFeatures }) => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWhyWH = () => {
    const whyWHSection = document.getElementById('why-wh');
    if (whyWHSection) {
      whyWHSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const keyFeatures = ["AI-native platform", "Real-time analytics", "SOC 2 certified"];

  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn delay={0.2}>
            <div className="max-w-2xl">
              <h1 className="text-[3.5rem] font-semibold tracking-tight text-gray-900 leading-[1.15]">
                Holistic wealth management for{' '}
                <span className="text-violet-600">
                  family offices
                </span>
                {' '}and{' '}
                <span className="text-violet-600">
                  institutions
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                All your wealth made actionable on one platform<br />
                across all your banks, brokers and custodians
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-black text-white hover:bg-gray-800 h-12 px-8"
                  onClick={scrollToContact}
                >
                  Contact Us
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8"
                  onClick={scrollToWhyWH}
                >
                  Learn More
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 items-center">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <CheckCircle size={16} className="text-violet-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              <div className="relative aspect-[4/3]">
                <DashboardAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
