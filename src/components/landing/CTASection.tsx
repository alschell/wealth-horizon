
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/animation";

const CTASection: React.FC = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-indigo-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Optimize Your Wealth Management?</h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl">
              Join leading family offices and institutions that have transformed their operations with <span className="font-semibold"><span className="text-indigo-200">Wealth</span><span className="text-white">Horizon</span></span>.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-md px-8" asChild>
                <Link to="/onboarding">Get Started</Link>
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-indigo-600 hover:bg-gray-100 text-md px-8"
                onClick={scrollToContact}
              >
                Contact Sales
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
