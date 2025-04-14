
import React from "react";
import { Button } from "@/components/ui/button";
import ActionButtons from "./recommendation/ActionButtons";

type ActionableRecommendationProps = {
  text: string;
};

const ActionableRecommendation = ({ text }: ActionableRecommendationProps) => {
  return (
    <div className="p-3 rounded-md border border-gray-100">
      <p className="text-sm">{text}</p>
      <ActionButtons />
    </div>
  );
};

export default ActionableRecommendation;
