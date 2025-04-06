
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "./types";
import { notificationData } from "./notificationData";
import { toast } from "sonner"; // Make sure this is imported

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(notificationData);
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

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    setIsOpen(false);
    
    // Safe navigation - always default to dashboard if link is invalid
    let targetRoute = notification.link || "/dashboard";
    
    // Sanitize link to avoid 404s - make sure it starts with a slash
    if (!targetRoute.startsWith('/')) {
      targetRoute = `/${targetRoute}`;
    }
    
    // Make sure we navigate to a valid route to prevent 404s
    const validRoutes = [
      '/dashboard',
      '/analyze-wealth',
      '/market-data',
      '/profile',
      '/settings',
      '/notifications',
      '/advice',
      '/cashflow',
      '/reporting',
      '/integrations',
      '/documents',
      '/esg',
      '/tax-optimization',
      '/legacy-planning',
      '/entity-management',
      '/compliance-monitoring',
      '/client-portal',
      '/trading',
      '/credit-facilities'
    ];
    
    // Check if the link is valid or default to dashboard
    const isValidRoute = validRoutes.some(route => targetRoute.startsWith(route));
    
    if (!isValidRoute) {
      console.warn(`Invalid notification link: ${targetRoute}, redirecting to dashboard`);
      toast.warning("That page doesn't exist yet. Redirecting to dashboard.");
      targetRoute = "/dashboard";
    }
    
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
