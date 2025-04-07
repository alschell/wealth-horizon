
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Bell, BellRing, Clock, CheckCircle, AlertTriangle, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionHeader from "./SectionHeader";

const NotificationsFeed = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: "trade-executed",
      title: "New Trade Executed",
      description: "Your order to buy 100 shares of AAPL has been executed.",
      time: "2 hours ago",
      icon: <BellRing className="h-4 w-4 text-gray-500" />,
      link: "/trading"
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
      link: "/dashboard"
    },
    {
      id: "quarterly-review",
      title: "Quarterly Review Meeting",
      description: "Event: Your quarterly financial review is scheduled for June 15.",
      time: "1 week ago",
      icon: <Calendar className="h-4 w-4 text-gray-500" />,
      link: "/dashboard"
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
    <Card className="shadow-sm h-[700px] flex flex-col">
      <CardHeader className="pb-2">
        <SectionHeader title="Notifications, events and tasks" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-6 pt-0">
        <ScrollArea className="flex-grow">
          <div className="space-y-3">
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
        </ScrollArea>
        
        <div className="mt-auto pt-4">
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
