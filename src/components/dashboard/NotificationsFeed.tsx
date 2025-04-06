
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Bell, BellRing, Clock, CheckCircle, AlertTriangle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const NotificationsFeed = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Notifications, events and tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
          <div className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-8 w-8 flex items-center justify-center bg-blue-50 rounded-full">
                <BellRing className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">New Trade Executed</p>
                <p className="text-xs text-gray-500 mt-1">
                  Your order to buy 100 shares of AAPL has been executed.
                </p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-8 w-8 flex items-center justify-center bg-amber-50 rounded-full">
                <CheckCircle className="h-4 w-4 text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Review Portfolio Allocation</p>
                <p className="text-xs text-gray-500 mt-1">
                  Task: Review and approve the new portfolio allocation strategy.
                </p>
                <p className="text-xs text-gray-400 mt-1">Today</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-8 w-8 flex items-center justify-center bg-green-50 rounded-full">
                <Bell className="h-4 w-4 text-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Credit Application Approved</p>
                <p className="text-xs text-gray-500 mt-1">
                  Your application for a new credit line has been approved.
                </p>
                <p className="text-xs text-gray-400 mt-1">Yesterday</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-8 w-8 flex items-center justify-center bg-purple-50 rounded-full">
                <Calendar className="h-4 w-4 text-purple-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Quarterly Review Meeting</p>
                <p className="text-xs text-gray-500 mt-1">
                  Event: Your quarterly financial review is scheduled for June 15.
                </p>
                <p className="text-xs text-gray-400 mt-1">1 week ago</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-8 w-8 flex items-center justify-center bg-red-50 rounded-full">
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">Portfolio Alert</p>
                <p className="text-xs text-gray-500 mt-1">
                  Your portfolio has increased by 5% this month.
                </p>
                <p className="text-xs text-gray-400 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
          
          <Link to="/notifications">
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
              View All Notifications
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsFeed;
