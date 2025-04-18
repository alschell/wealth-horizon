
import React from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";

const Index = () => {
  const location = useLocation();
  
  // Ensure we scroll to top when this component mounts
  React.useEffect(() => {
    console.log("Index component mounted", { pathname: location.pathname });
    window.scrollTo(0, 0);
  }, []);

  // Directly render the LandingPage component
  return <LandingPage />;
};

export default Index;
