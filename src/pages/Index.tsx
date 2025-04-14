
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const location = useLocation();
  
  // Try to access language context to verify it's available
  useEffect(() => {
    try {
      // Check if language context is available
      const { language } = useLanguage();
      console.log("Language context is available in Index, language =", language);
    } catch (error) {
      console.error("Language context is NOT available in Index:", error);
    }
  }, []);
  
  console.log("Index page rendered, loading landing page");
  return <LandingPage />;
};

export default Index;
