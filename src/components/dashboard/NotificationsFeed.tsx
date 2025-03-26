
import React from "react";
import { Bell, Calendar, CreditCard, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "trade" | "credit" | "alert" | "appointment";
}

const NotificationsFeed = () => {
  // Mock data - in a real app, this would come from your API
  const notifications: Notification[] = [
    {
      id: "1",
      title: "New Trade Executed",
      description: "Your order to buy 100 shares of AAPL has been executed.",
      timestamp: "2 hours ago",
      type: "trade",
    },
    {
      id: "2",
      title: "Credit Application Approved",
      description: "Your application for a new credit line has been approved.",
      timestamp: "Yesterday",
      type: "credit",
    },
    {
      id: "3",
      title: "Portfolio Alert",
      description: "Your portfolio has increased by 5% this month.",
      timestamp: "2 days ago",
      type: "alert",
    },
    {
      id: "4",
      title: "Financial Review",
      description: "Your quarterly financial review is scheduled for June 15.",
      timestamp: "1 week ago",
      type: "appointment",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "trade":
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case "credit":
        return <CreditCard className="h-5 w-5 text-green-500" />;
      case "alert":
        return <Bell className="h-5 w-5 text-yellow-500" />;
      case "appointment":
        return <Calendar className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Recent Notifications</CardTitle>
          <Button variant="link" className="h-8 px-2">View All</Button>
        </div>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-auto">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className="flex items-start p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="mr-3 mt-0.5">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{notification.title}</p>
                <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsFeed;
