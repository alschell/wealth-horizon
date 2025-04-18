
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";
import { useTranslation } from "@/context/TranslationContext";

const Index = () => {
  const location = useLocation();
  const { currentLanguage } = useTranslation();
  
  // Ensure we scroll to top when this component mounts or language changes
  useEffect(() => {
    console.log("Index component mounted or language changed", { 
      pathname: location.pathname,
      language: currentLanguage 
    });
    
    // Force scroll to top on language change or navigation
    window.scrollTo(0, 0);
  }, [location, currentLanguage]);

  // Always render the LandingPage component
  return <LandingPage />;
};

export default Index;
