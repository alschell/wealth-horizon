
import React from "react";
import { Button } from "@/components/ui/button";

interface NotificationsHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

const NotificationsHeader = ({ unreadCount, onMarkAllAsRead }: NotificationsHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      <h3 className="font-semibold">Notifications</h3>
      {unreadCount > 0 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs h-auto py-1"
          onClick={onMarkAllAsRead}
        >
          Mark all as read
        </Button>
      )}
    </div>
  );
};

export default NotificationsHeader;
