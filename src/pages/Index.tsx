
import React from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";

const Index = () => {
  // We no longer automatically redirect, instead just show the landing page
  return <LandingPage />;
};

export default Index;
