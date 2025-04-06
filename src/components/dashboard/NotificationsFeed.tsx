
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  TrendingUp, 
  CreditCard, 
  Bell, 
  Calendar,
  CheckCircle 
} from "lucide-react";
import { Link } from "react-router-dom";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "trade" | "credit" | "alert" | "appointment" | "task" | "event";
}

const NotificationsFeed = () => {
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
      title: "Review Portfolio Allocation",
      description: "Task: Review and approve the new portfolio allocation strategy.",
      timestamp: "Today",
      type: "task",
    },
    {
      id: "3",
      title: "Credit Application Approved",
      description: "Your application for a new credit line has been approved.",
      timestamp: "Yesterday",
      type: "credit",
    },
    {
      id: "4",
      title: "Quarterly Review Meeting",
      description: "Event: Your quarterly financial review is scheduled for June 15.",
      timestamp: "1 week ago",
      type: "event",
    },
    {
      id: "5",
      title: "Portfolio Alert",
      description: "Your portfolio has increased by 5% this month.",
      timestamp: "2 days ago",
      type: "alert",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "trade":
        return <TrendingUp className="h-5 w-5 text-gray-500" />;
      case "credit":
        return <CreditCard className="h-5 w-5 text-gray-500" />;
      case "alert":
        return <Bell className="h-5 w-5 text-gray-500" />;
      case "appointment":
      case "event":
        return <Calendar className="h-5 w-5 text-gray-500" />;
      case "task":
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-8 w-8 flex items-center justify-center bg-gray-50 rounded-full">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
          
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
