
import React from "react";
import ActionableRecommendation from "./ActionableRecommendation";
import { AlertTriangle, Briefcase, FileSpreadsheet, TrendingUp, DollarSign, Shield } from "lucide-react";

type RecommendationsTabContentProps = {
  recommendations: {
    text: string;
    priority: string;
  }[];
};

const RecommendationsTabContent = ({ recommendations }: RecommendationsTabContentProps) => {
  const enhancedRecommendations = [
    {
      text: "Rebalance your equity allocation to reduce risk by 15% based on current market volatility",
      category: "Portfolio Optimization",
      icon: <TrendingUp className="h-4 w-4" />,
      priority: "high"
    },
    {
      text: "Consider increasing fixed income exposure by 8% to improve portfolio stability",
      category: "Asset Allocation",
      icon: <Briefcase className="h-4 w-4" />,
      priority: "medium"
    },
    {
      text: "Implement currency hedging for EUR exposure to protect against anticipated volatility",
      category: "Risk Management",
      icon: <Shield className="h-4 w-4" />,
      priority: "high"
    },
    {
      text: "Review overlapping technology ETFs to eliminate redundancy and reduce fees",
      category: "Fee Optimization",
      icon: <FileSpreadsheet className="h-4 w-4" />,
      priority: "medium"
    },
    {
      text: "Evaluate tax-loss harvesting opportunities in underperforming sectors",
      category: "Tax Optimization",
      icon: <DollarSign className="h-4 w-4" />,
      priority: "medium"
    },
    {
      text: "Address concentration risk in your portfolio with immediate sector diversification",
      category: "Risk Alert",
      icon: <AlertTriangle className="h-4 w-4" />,
      priority: "high"
    }
  ];
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {enhancedRecommendations.map((recommendation, index) => (
          <ActionableRecommendation 
            key={index}
            text={recommendation.text}
            category={recommendation.category}
            icon={recommendation.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationsTabContent;
