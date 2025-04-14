
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, BarChart3 } from "@/utils/icons";

const OverviewCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" />
            Active Mandates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">2</p>
          <p className="text-sm text-gray-500">Discretionary and Advisory</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <Clock className="h-4 w-4 mr-2 text-amber-500" />
            Pending Approval
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">1</p>
          <p className="text-sm text-gray-500">JP Morgan private bank</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center">
            <BarChart3 className="h-4 w-4 mr-2 text-blue-500" />
            Portfolio Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">+8.2%</p>
          <p className="text-sm text-gray-500">Across all mandates</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCards;
