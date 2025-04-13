
import React from "react";
import { Helmet } from "react-helmet-async"; // Using react-helmet-async for better React 18 compatibility
import { LandingLayout } from "@/components/landing";

const LandingPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Wealth Horizon | Intelligent Wealth Management</title>
        <meta name="description" content="Wealth Horizon provides comprehensive wealth management solutions for family offices and high-net-worth individuals." />
        <meta name="keywords" content="wealth management, family office, financial planning, investment" />
        <meta property="og:title" content="Wealth Horizon | Intelligent Wealth Management" />
        <meta property="og:description" content="Comprehensive wealth management solutions for family offices and high-net-worth individuals." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wealth Horizon | Intelligent Wealth Management" />
        <meta name="twitter:description" content="Comprehensive wealth management solutions for family offices." />
        <link rel="canonical" href="https://wealthhorizon.com/" />
      </Helmet>
      <LandingLayout />
    </>
  );
};

export default LandingPage;
