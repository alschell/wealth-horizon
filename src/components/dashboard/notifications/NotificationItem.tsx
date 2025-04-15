import React from "react";
import { 
  Bell,
  AlertCircle,
  Info,
  CheckCircle,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Notification } from "./types";

interface NotificationItemProps {
  notification: Notification;
  onDismiss: (id: number) => void;
  onClick: (notification: Notification) => void;
}

/**
 * Notification item component that displays a single notification
 */
const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onDismiss, 
  onClick 
}) => {
  const { id, title, message, read, type, time } = notification;

  /**
   * Get the appropriate icon based on notification type
   */
  const getIcon = () => {
    if (notification.icon) return notification.icon;

    switch (type) {
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  /**
   * Format the timestamp
   */
  const formatTime = (time: string | Date): string => {
    if (typeof time === 'string') {
      return time;
    }
    
    // Format date objects
    const now = new Date();
    const notificationDate = new Date(time);
    
    // If today, return time only
    if (notificationDate.toDateString() === now.toDateString()) {
      return notificationDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Otherwise return date
    return notificationDate.toLocaleDateString();
  };

  /**
   * Handle notification click
   */
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(notification);
  };

  /**
   * Handle dismiss button click
   */
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDismiss(id);
  };

  return (
    <div 
      onClick={handleClick}
      className={cn(
        "flex items-start p-3 cursor-pointer hover:bg-muted transition-colors relative",
        !read && "bg-muted/50"
      )}
      role="button"
      tabIndex={0}
      aria-label={`Notification: ${title}`}
    >
      {/* Notification icon */}
      <div className="mr-3 mt-0.5">
        {getIcon()}
      </div>
      
      {/* Notification content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold leading-none mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2">{message}</p>
        <span className="text-xs text-muted-foreground mt-1 block">
          {formatTime(time)}
        </span>
      </div>
      
      {/* Dismiss button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-6 w-6 p-0 absolute top-2 right-2 opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
        onClick={handleDismiss}
        aria-label="Dismiss notification"
      >
        <X className="h-3 w-3" />
      </Button>
      
      {/* Unread indicator */}
      {!read && (
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary" />
      )}
    </div>
  );
};

export default NotificationItem;
