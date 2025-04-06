
import React from "react";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div
      className={cn(
        "animate-fade-in transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageTransition;
