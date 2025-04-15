
import React from "react";
import { motion } from "framer-motion";
import NotificationItem from "./NotificationItem";
import { Notification } from "./types";

interface NotificationsListProps {
  notifications: Notification[];
  onDismiss: (id: number) => void;
  onClick: (notification: Notification) => void;
}

/**
 * Container component that renders a list of notifications
 */
const NotificationsList: React.FC<NotificationsListProps> = ({ 
  notifications, 
  onDismiss, 
  onClick 
}) => {
  // Animation variants for list items
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  // If there are no notifications, show empty state
  if (notifications.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-sm text-muted-foreground">No notifications</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="py-2"
      variants={listVariants}
      initial="hidden"
      animate="show"
    >
      {notifications.map((notification) => (
        <motion.div key={notification.id} variants={itemVariants}>
          <NotificationItem 
            notification={notification} 
            onDismiss={onDismiss} 
            onClick={onClick} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default NotificationsList;
