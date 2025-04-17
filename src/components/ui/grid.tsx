
import React from "react";
import { cn } from "@/lib/utils";

interface GridProps {
  children: React.ReactNode;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({ children, className }) => {
  return <div className={cn("grid", className)}>{children}</div>;
};

export default Grid;
