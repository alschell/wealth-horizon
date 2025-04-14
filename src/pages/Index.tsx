
import React from "react";
import { useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";

const Index = () => {
  const location = useLocation();
  
  console.log("Index page rendered, loading landing page");
  return <LandingPage />;
};

export default Index;
