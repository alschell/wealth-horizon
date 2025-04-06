
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NotificationsFooterProps {
  onClose: () => void;
}

const NotificationsFooter = ({ onClose }: NotificationsFooterProps) => {
  return (
    <div className="p-4 text-center">
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full text-xs"
        onClick={onClose}
        asChild
      >
        <Link to="/notifications">View all notifications</Link>
      </Button>
    </div>
  );
};

export default NotificationsFooter;
