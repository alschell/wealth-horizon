
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "../types";
import { notificationData } from "../notificationData";
import { toast } from "sonner";
import { useValidRoutes } from "./useValidRoutes";

/**
 * Hook for managing notifications state and interactions
 * 
 * @returns Object containing notification state and handler functions
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(notificationData);
  const [isOpen, setIsOpen] = useState(false);
  
  const navigate = useNavigate();
  const { isValidRoute, getValidRoute } = useValidRoutes();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  /**
   * Mark a specific notification as read
   * 
   * @param id The ID of the notification to mark as read
   */
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  /**
   * Dismiss (remove) a notification
   * 
   * @param id The ID of the notification to dismiss
   */
  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  /**
   * Handle notification click - marks as read and navigates to the target route
   * 
   * @param notification The notification that was clicked
   */
  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    setIsOpen(false);
    
    if (!notification.link) {
      navigate("/dashboard");
      return;
    }
    
    const targetRoute = getValidRoute(notification.link);
    navigate(targetRoute);
  };

  return {
    notifications,
    isOpen,
    setIsOpen,
    unreadCount,
    markAllAsRead,
    markAsRead,
    dismissNotification,
    handleNotificationClick
  };
};
