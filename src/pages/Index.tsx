
import React from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  // Temporarily redirect to dashboard instead of showing a landing page
  return <Navigate to="/dashboard" replace />;
};

export default Index;
