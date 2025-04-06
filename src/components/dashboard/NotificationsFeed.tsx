
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Bell, BellRing, Clock, CheckCircle, AlertTriangle, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotificationsFeed = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: "trade-executed",
      title: "New Trade Executed",
      description: "Your order to buy 100 shares of AAPL has been executed.",
      time: "2 hours ago",
      icon: <BellRing className="h-4 w-4 text-gray-500" />,
      link: "/trading/history/trade-123"
    },
    {
      id: "portfolio-review",
      title: "Review Portfolio Allocation",
      description: "Task: Review and approve the new portfolio allocation strategy.",
      time: "Today",
      icon: <CheckCircle className="h-4 w-4 text-gray-500" />,
      link: "/analyze-wealth"
    },
    {
      id: "credit-approved",
      title: "Credit Application Approved",
      description: "Your application for a new credit line has been approved.",
      time: "Yesterday",
      icon: <Bell className="h-4 w-4 text-gray-500" />,
      link: "/credit-facilities"
    },
    {
      id: "quarterly-review",
      title: "Quarterly Review Meeting",
      description: "Event: Your quarterly financial review is scheduled for June 15.",
      time: "1 week ago",
      icon: <Calendar className="h-4 w-4 text-gray-500" />,
      link: "/calendar"
    },
    {
      id: "portfolio-alert",
      title: "Portfolio Alert",
      description: "Your portfolio has increased by 5% this month.",
      time: "2 days ago",
      icon: <AlertTriangle className="h-4 w-4 text-gray-500" />,
      link: "/analyze-wealth"
    }
  ];

  const handleNotificationClick = (notification: any) => {
    navigate(notification.link);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Notifications, events and tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative">
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 pb-12">
          {notifications.map((notification, index) => (
            <div 
              key={index} 
              className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 h-8 w-8 flex items-center justify-center bg-gray-50 rounded-full">
                  {notification.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-white pb-5 pt-2">
          <div className="px-2">
            <Link to="/notifications">
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                View All Notifications
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsFeed;
