
import React, { useState } from "react";
import { Bell, X, FileText, TrendingUp, AlertTriangle, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

// Enhanced notification data with details, links, and icons
const notificationData = [
  {
    id: 1,
    title: "New advisory proposal",
    description: "UBS has sent a new proposal for your review",
    time: "10 minutes ago",
    read: false,
    icon: <FileText className="h-4 w-4" />,
    link: "/advice",
    details: {
      sender: "UBS Wealth Management",
      priority: "High",
      attachments: [
        { name: "Advisory_Proposal_Q2_2025.pdf", size: "1.2 MB" },
        { name: "Fee_Structure_Overview.xlsx", size: "852 KB" }
      ],
      content: "New discretionary mandate proposed with focus on sustainable investments. Fee structure changes included with 15% reduction from previous offer."
    }
  },
  {
    id: 2,
    title: "Market alert",
    description: "Unusual volatility detected in your portfolio",
    time: "2 hours ago",
    read: false,
    icon: <AlertTriangle className="h-4 w-4" />,
    link: "/market-data",
    details: {
      sender: "Market Alert System",
      priority: "Medium",
      affectedAssets: ["US Equities", "Tech Sector ETFs"],
      content: "Several of your key holdings are experiencing high volatility due to recent economic announcements. Consider reviewing your position in technology assets."
    }
  },
  {
    id: 3,
    title: "Document signed",
    description: "Your mandate agreement was successfully signed",
    time: "Yesterday",
    read: true,
    icon: <Check className="h-4 w-4" />,
    link: "/documents",
    details: {
      sender: "Document Management",
      documentId: "MAND-20250405-001",
      counterparties: ["BlackRock", "Family Office"],
      content: "All parties have successfully signed the discretionary mandate agreement. The document has been securely stored and is available for your review."
    }
  },
  {
    id: 4,
    title: "Quarterly report available",
    description: "Your Q1 performance report is now available",
    time: "3 days ago",
    read: true,
    icon: <TrendingUp className="h-4 w-4" />,
    link: "/reports",
    details: {
      sender: "Performance Reporting",
      period: "Q1 2025",
      highlights: [
        "Overall performance: +3.2%",
        "Benchmark comparison: +1.5%",
        "Top performer: Technology sector (+7.8%)"
      ],
      attachments: [
        { name: "Q1_2025_Performance_Report.pdf", size: "3.4 MB" }
      ],
      content: "Your quarterly performance report has been generated. Overall portfolio performance exceeds benchmark by 1.5%. Detailed asset class breakdown available in the full report."
    }
  }
];

const NotificationsPopover = () => {
  const [notifications, setNotifications] = useState(notificationData);
  const [isOpen, setIsOpen] = useState(false);
  
  const navigate = useNavigate();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    setIsOpen(false);
    navigate(notification.link);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-black">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-black text-white"
                    variant="default"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Notifications</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-auto py-1"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        
        <div className="max-h-[60vh] overflow-auto">
          {notifications.length > 0 ? (
            <div className="py-2">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={cn(
                    "flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer group",
                    !notification.read && "bg-muted/30"
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-white",
                    notification.id === 1 ? "bg-blue-500" : 
                    notification.id === 2 ? "bg-amber-500" : 
                    notification.id === 3 ? "bg-green-500" : "bg-gray-500"
                  )}>
                    {notification.icon}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-black" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissNotification(notification.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Dismiss</span>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center">
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          )}
        </div>
        
        <Separator />
        <div className="p-4 text-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs"
            onClick={() => setIsOpen(false)}
            asChild
          >
            <Link to="/notifications">View all notifications</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
