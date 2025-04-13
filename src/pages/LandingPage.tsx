
import React from "react";
import { Helmet } from "react-helmet";
import { LandingLayout } from "@/components/landing";

const LandingPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Wealth Horizon | Intelligent Wealth Management</title>
        <meta name="description" content="Wealth Horizon provides comprehensive wealth management solutions for family offices and high-net-worth individuals." />
        <meta name="keywords" content="wealth management, family office, financial planning, investment" />
      </Helmet>
      <LandingLayout />
    </>
  );
};

export default LandingPage;
