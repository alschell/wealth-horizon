
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RecommendationItem } from "@/components/dashboard/recommendations";
import { SectionHeader } from "@/components/dashboard";

type Recommendation = {
  id: string;
  title: string;
  description: string;
  impact: string;
  type: string;
};

interface RecommendationsListProps {
  recommendations: Recommendation[];
  title?: string;
  showHeader?: boolean;
  onItemClick?: (recommendation: Recommendation) => void;
}

const RecommendationsList = ({ 
  recommendations, 
  title = "Recommendations", 
  showHeader = true,
  onItemClick 
}: RecommendationsListProps) => {
  if (recommendations.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-6">
            <p className="text-gray-500">No recommendations available at this time.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      {showHeader && (
        <CardHeader className="pb-2">
          <SectionHeader title={title} />
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-2">
          {recommendations.map((recommendation) => (
            <RecommendationItem 
              key={recommendation.id || `${recommendation.title}-${recommendation.type}`}
              recommendation={recommendation}
              onClick={() => onItemClick && onItemClick(recommendation)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsList;
