
import React from "react";
import RiskMetricsCard from "../metrics/RiskMetricsCard";
import RiskFactorsSection from "../factors/RiskFactorsSection";

type RiskMetric = {
  label: string;
  score: number;
  unit?: string;
  change: string;
  changeDirection?: "up" | "down";
  color?: string;
  tooltip: string;
};

type PortfolioRiskTabProps = {
  riskMetrics: RiskMetric[];
};

const PortfolioRiskTab = ({ riskMetrics }: PortfolioRiskTabProps) => {
  return (
    <>
      <RiskMetricsCard metrics={riskMetrics} />
      <RiskFactorsSection />
    </>
  );
};

export default PortfolioRiskTab;
