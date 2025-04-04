
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to dashboard when the index page is loaded
    navigate("/dashboard");
  }, [navigate]);
  
  // Return the LandingPage as a fallback while redirecting
  return <LandingPage />;
};

export default Index;
