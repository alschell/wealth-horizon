
import React from "react";
import { Button } from "@/components/ui/button";
import { TranslatedText } from "@/components/ui/translated-text";
import { FadeIn } from "@/components/ui/animation";

interface HeroSectionProps {
  onScrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToFeatures }) => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              <TranslatedText>Streamline Your</TranslatedText>{" "}
              <span className="text-indigo-600">
                <TranslatedText>Wealth Management</TranslatedText>
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl">
              <TranslatedText>
                A comprehensive platform designed for family offices and high-net-worth individuals to optimize asset allocation, simplify reporting, and enhance decision-making.
              </TranslatedText>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8"
                onClick={onScrollToFeatures}
              >
                <TranslatedText>Explore Features</TranslatedText>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-lg px-8"
              >
                <TranslatedText>Book a Demo</TranslatedText>
              </Button>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.3} className="hidden lg:block">
            <div className="relative w-full h-[500px] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full h-full bg-white/90 backdrop-blur-sm rounded-lg shadow-lg flex items-center justify-center">
                  <p className="text-xl font-medium text-gray-700">
                    <TranslatedText>Platform Preview</TranslatedText>
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
