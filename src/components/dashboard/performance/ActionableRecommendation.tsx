
import React from "react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

type ActionableRecommendationProps = {
  text: string;
  category?: string;
  icon?: React.ReactNode;
};

const ActionableRecommendation = ({ text, category, icon }: ActionableRecommendationProps) => {
  return (
    <div className="p-4 rounded-md border border-gray-200 bg-gray-50">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
          {icon || <FileSpreadsheet className="h-4 w-4" />}
        </div>
        <div className="flex-1">
          {category && (
            <p className="text-xs font-medium text-gray-500 mb-1">{category}</p>
          )}
          <p className="text-sm">{text}</p>
          <div className="flex justify-end mt-3">
            <Button variant="outline" size="sm" className="mr-2">
              Dismiss
            </Button>
            <Button size="sm">
              Take Action
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionableRecommendation;
