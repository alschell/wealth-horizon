
import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-2 rounded-md hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Portfolio rebalanced</p>
                <p className="text-xs text-gray-500">Today at 09:45 AM</p>
              </div>
            </div>
          </div>
          
          <div className="p-2 rounded-md hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Cash deposit received</p>
                <p className="text-xs text-gray-500">Yesterday at 2:30 PM</p>
              </div>
            </div>
          </div>
          
          <Link to="/activity" className="block mt-3">
            <Button variant="outline" size="sm" className="w-full">
              View All Activity
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
