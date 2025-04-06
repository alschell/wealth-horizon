
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface DataCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
}

const DataCard = ({ title, children, className, action }: DataCardProps) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="px-6 pt-6 pb-4">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex-grow">{children}</div>
        
        {action && (
          <Link to={action.href} className="block mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={action.onClick}
            >
              {action.label}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default DataCard;
