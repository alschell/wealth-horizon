
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, X, Settings, LogOut } from "lucide-react";
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

// Sample notification data
const notificationData = [
  {
    id: 1,
    title: "New advisory proposal",
    description: "UBS has sent a new proposal for your review",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Market alert",
    description: "Unusual volatility detected in your portfolio",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Document signed",
    description: "Your mandate agreement was successfully signed",
    time: "Yesterday",
    read: true,
  },
  {
    id: 4,
    title: "Quarterly report available",
    description: "Your Q1 performance report is now available",
    time: "3 days ago",
    read: true,
  }
];

const DashboardHeader = () => {
  const [notifications, setNotifications] = useState(notificationData);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
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

  // Helper function to get the current page title
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === "/dashboard") return "Dashboard";
    if (path === "/analyze-wealth") return "Wealth Analysis";
    if (path === "/advice") return "Advisory";
    if (path === "/trading") return "Trading";
    if (path === "/market-data") return "Market Data & News";
    if (path === "/dashboard/credit") return "Credit Facilities";
    if (path === "/cashflow") return "Cashflow & Liquidity";
    if (path === "/integrations") return "Integrations";
    if (path === "/settings") return "Settings";
    if (path === "/reporting") return "Reporting";
    if (path === "/dashboard/users") return "User Management";
    
    return "Wealth Pro";
  };

  return (
    <header className="h-16 px-3 flex items-center justify-between border-b border-border bg-white">
      <div className="flex items-center gap-2 max-w-[95%] mx-auto w-full">
        <div className="text-xl font-bold tracking-tight">
          <span className="text-indigo-400">W</span>
          <span>ealth Pro</span>
        </div>
        <span className="text-lg font-medium ml-6">{getPageTitle()}</span>
      </div>
      
      <div className="flex items-center gap-3 mr-3">
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
                        "flex justify-between p-3 hover:bg-muted/50 transition-colors",
                        !notification.read && "bg-muted/30"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="space-y-1">
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
              >
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black" asChild>
                <Link to="/settings">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black" asChild>
                <Link to="/">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Log Out</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Log Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default DashboardHeader;
