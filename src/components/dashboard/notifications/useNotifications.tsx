
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "./types";
import { notificationData } from "./notificationData";
import { toast } from "sonner";

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
    
    // Handle navigation based on notification link
    if (!notification.link) {
      navigate("/dashboard");
      return;
    }
    
    // Sanitize link to ensure it starts with a slash
    let targetRoute = notification.link.startsWith('/') 
      ? notification.link 
      : `/${notification.link}`;
    
    // List of valid routes to prevent navigation to non-existent pages
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
      '/credit-facilities',
      '/reports'
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
