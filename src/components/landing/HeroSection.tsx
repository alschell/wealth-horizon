
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, ScaleIn } from "@/components/ui/animation";
import DashboardAnimation from "@/components/animations/DashboardAnimation";

interface HeroSectionProps {
  onScrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToFeatures }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white -z-10"></div>
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Holistic wealth management for{" "}
              <span className="text-indigo-600">family offices</span> and{" "}
              <span className="text-indigo-600">institutions</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl">
              All your wealth made actionable on one platform<br />
              across all your banks, brokers & custodians
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-md px-8 bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
                <Link to="/onboarding">Get Started</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-md px-8"
                onClick={onScrollToFeatures}
              >
                Learn More
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 items-center text-sm text-gray-600">
              {["Bank-level security", "Full compliance", "Real-time analytics"].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-indigo-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <ScaleIn delay={0.4}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100">
              <div className="relative aspect-[4/3]">
                <DashboardAnimation />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
          </ScaleIn>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={onScrollToFeatures}
            aria-label="Scroll to features"
            className="p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors"
          >
            <ChevronDown size={24} className="text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
