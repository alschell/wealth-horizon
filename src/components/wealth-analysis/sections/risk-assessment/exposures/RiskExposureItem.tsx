
import React from "react";
import { AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type RiskExposureItemProps = {
  name: string;
  value: number;
  warning: string | null;
  riskColor: string;
};

const RiskExposureItem = ({ name, value, warning, riskColor }: RiskExposureItemProps) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <div className="text-sm font-medium">{name}</div>
        <div className="text-sm font-medium">{value}%</div>
      </div>
      <div className="relative w-full">
        <Progress value={value} className={`h-2 ${riskColor}`} />
      </div>
      {warning && (
        <div className="flex items-center mt-1 text-xs text-gray-600">
          <AlertCircle className="h-3 w-3 mr-1" />
          {warning}
        </div>
      )}
    </div>
  );
};

export default RiskExposureItem;
