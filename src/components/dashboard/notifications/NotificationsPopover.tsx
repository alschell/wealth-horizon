
import React from "react";
import {
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { useNotifications } from "./useNotifications";
import NotificationBadge from "./NotificationBadge";
import NotificationsHeader from "./NotificationsHeader";
import NotificationsList from "./NotificationsList";
import NotificationsFooter from "./NotificationsFooter";

const NotificationsPopover = () => {
  const {
    notifications,
    isOpen,
    setIsOpen,
    unreadCount,
    markAllAsRead,
    dismissNotification,
    handleNotificationClick
  } = useNotifications();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <NotificationBadge unreadCount={unreadCount} />

      <PopoverContent className="w-80 p-0" align="end">
        <NotificationsHeader 
          unreadCount={unreadCount} 
          onMarkAllAsRead={markAllAsRead} 
        />
        
        <Separator />
        
        <div className="max-h-[60vh] overflow-auto">
          <NotificationsList 
            notifications={notifications} 
            onDismiss={dismissNotification} 
            onClick={handleNotificationClick} 
          />
        </div>
        
        <Separator />
        
        <NotificationsFooter onClose={() => setIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
