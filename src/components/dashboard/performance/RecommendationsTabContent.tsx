
import React from "react";
import { Brain, ArrowRight, TrendingUp, ShieldAlert, BarChart4, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecommendationItem from "./RecommendationItem";
import ActionableRecommendation from "./ActionableRecommendation";

type RecommendationProps = {
  text: string;
  priority: string;
};

type RecommendationsTabContentProps = {
  recommendations: RecommendationProps[];
};

const RecommendationsTabContent = ({ recommendations }: RecommendationsTabContentProps) => {
  // Enhanced AI recommendations for next best actions
  const aiRecommendations = [
    {
      text: "Rebalance your equity allocation to reduce risk exposure in current market conditions",
      priority: "high"
    },
    {
      text: "Consider increasing fixed income exposure by 8% to hedge against anticipated market volatility",
      priority: "medium"
    },
    {
      text: "Review and consolidate three similar technology ETFs to reduce overlap and save on fees",
      priority: "medium"
    },
    {
      text: "Implement currency hedging strategy for EUR exposure based on current monetary policy outlook",
      priority: "high"
    },
    {
      text: "Transition 15% of passive investments to actively managed strategies in the current market environment",
      priority: "medium"
    },
    {
      text: "Prepare for tax season by reviewing capital gains harvesting opportunities in your portfolio",
      priority: "medium" 
    }
  ];
  
  // Actionable recommendations with specific details
  const actionableRecommendations = [
    {
      text: "Your cash reserves are above target. Consider investing $240M in short-term treasury instruments to improve yield while maintaining liquidity.",
      category: "Cash Management",
      icon: <FileSpreadsheet className="h-4 w-4" />
    },
    {
      text: "Sector over-concentration detected. Diversify your technology exposure by reducing allocation by 12% to mitigate sector-specific risk.",
      category: "Risk Management",
      icon: <ShieldAlert className="h-4 w-4" />
    },
    {
      text: "Based on your investment policy, increase ESG exposure by 5% through new sustainable infrastructure investments offering stable yields.",
      category: "Portfolio Alignment",
      icon: <BarChart4 className="h-4 w-4" />
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium flex items-center">
        <Brain className="h-4 w-4 mr-1 text-gray-500" /> AI-Powered Next Best Actions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {aiRecommendations.map((rec, index) => (
          <RecommendationItem 
            key={index} 
            text={rec.text} 
            priority={rec.priority} 
          />
        ))}
      </div>
      
      <h3 className="text-sm font-medium mt-8 mb-3 flex items-center">
        <TrendingUp className="h-4 w-4 mr-1 text-gray-500" /> Actionable Opportunities
      </h3>
      
      {actionableRecommendations.map((rec, index) => (
        <ActionableRecommendation 
          key={index} 
          text={rec.text}
          category={rec.category}
          icon={rec.icon}
        />
      ))}
      
      <Button variant="outline" className="w-full mt-4 flex items-center justify-center">
        View All Recommendations
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default RecommendationsTabContent;
