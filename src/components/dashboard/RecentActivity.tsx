import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const RecentActivity = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 flex items-center justify-center bg-gray-50 rounded-full">
                <TrendingUp className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Portfolio rebalanced</p>
                <p className="text-xs text-gray-500">Today at 09:45 AM</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 flex items-center justify-center bg-gray-50 rounded-full">
                <DollarSign className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Cash deposit received</p>
                <p className="text-xs text-gray-500">Yesterday at 2:30 PM</p>
              </div>
            </div>
          </div>
          
          <Link to="/activity">
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
              View All Activity
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
