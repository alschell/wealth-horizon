
import React from "react";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import RecommendationItem from "../components/RecommendationItem";
import ActionableRecommendation from "../components/ActionableRecommendation";

type RecommendationProps = {
  text: string;
  priority: string;
};

type RecommendationsTabContentProps = {
  recommendations: RecommendationProps[];
};

const RecommendationsTabContent = ({ recommendations }: RecommendationsTabContentProps) => {
  const navigate = useNavigate();
  
  const handleViewAll = () => {
    navigate("/wealth-analysis");
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium flex items-center">
        <Brain className="h-4 w-4 mr-1 text-gray-500" /> AI Recommendations
      </h3>
      
      {recommendations.map((rec, index) => (
        <RecommendationItem 
          key={index} 
          text={rec.text} 
          priority={rec.priority} 
        />
      ))}
      
      <ActionableRecommendation 
        text="Your cash reserves are above target. Consider investing $240M in short-term treasury instruments to improve yield while maintaining liquidity." 
      />
      
      <Button variant="outline" className="w-full" onClick={handleViewAll}>
        View All Recommendations
      </Button>
    </div>
  );
};

export default RecommendationsTabContent;
