
import React from "react";
import NotificationItem from "./NotificationItem";
import { Notification } from "./types";

interface NotificationsListProps {
  notifications: Notification[];
  onDismiss: (id: number) => void;
  onClick: (notification: Notification) => void;
}

const NotificationsList = ({ notifications, onDismiss, onClick }: NotificationsListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-sm text-muted-foreground">No notifications</p>
      </div>
    );
  }

  return (
    <div className="py-2">
      {notifications.map((notification) => (
        <NotificationItem 
          key={notification.id}
          notification={notification} 
          onDismiss={onDismiss} 
          onClick={onClick} 
        />
      ))}
    </div>
  );
};

export default NotificationsList;
