
import React from "react";
import { useNavigate } from "react-router-dom";
import LandingHero from "@/components/LandingHero";
import { ScaleIn, FadeIn } from "@/components/ui/animation";

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      <header className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <FadeIn>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-black rounded-lg"></div>
            <span className="font-semibold text-lg">WPro</span>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/dashboard')} 
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Dashboard
            </button>
          </div>
        </FadeIn>
      </header>
      
      <main>
        <LandingHero />
      </main>
    </div>
  );
};

export default LandingPage;
