
import React from "react";
import { Button } from "@/components/ui/button";

type ActionableRecommendationProps = {
  text: string;
};

const ActionableRecommendation = ({ text }: ActionableRecommendationProps) => {
  return (
    <div className="p-3 rounded-md border border-gray-100">
      <p className="text-sm">{text}</p>
      <div className="flex justify-end mt-2">
        <Button variant="outline" size="sm" className="mr-2">
          Dismiss
        </Button>
        <Button size="sm">
          Take Action
        </Button>
      </div>
    </div>
  );
};

export default ActionableRecommendation;
