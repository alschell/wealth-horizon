
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const RecentActivity = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative">
        <div className="space-y-3 pb-12 max-h-[300px] overflow-y-auto">
          <div className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-8 w-8 flex items-center justify-center bg-gray-50 rounded-full">
                <TrendingUp className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Portfolio rebalanced</p>
                <p className="text-xs text-gray-500">Today at 09:45 AM</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-8 w-8 flex items-center justify-center bg-gray-50 rounded-full">
                <DollarSign className="h-4 w-4 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Cash deposit received</p>
                <p className="text-xs text-gray-500">Yesterday at 2:30 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-white pb-5 pt-2">
          <div className="px-2">
            <Link to="/activity">
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                View All Activity
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
