
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Notification } from "./types";
import { format } from "date-fns";

interface NotificationItemProps {
  notification: Notification;
  onDismiss: (id: number) => void;
  onClick: (notification: Notification) => void;
}

const NotificationItem = ({ notification, onDismiss, onClick }: NotificationItemProps) => {
  // Format the time if it's a Date object
  const formattedTime = typeof notification.time === 'string' 
    ? notification.time 
    : format(notification.time, 'MMM dd, yyyy');
    
  return (
    <div 
      key={notification.id} 
      className={cn(
        "flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer group",
        !notification.read && "bg-muted/30"
      )}
      onClick={() => onClick(notification)}
    >
      <div className="mt-0.5 h-8 w-8 flex items-center justify-center bg-gray-50 rounded-full">
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
        <p className="text-xs text-muted-foreground">{formattedTime}</p>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onDismiss(notification.id);
        }}
      >
        <X className="h-3 w-3" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </div>
  );
};

export default NotificationItem;
