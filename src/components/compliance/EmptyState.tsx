
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon: Icon, 
  title, 
  description,
  action,
  className
}) => {
  return (
    <div className={cn("text-center py-12", className)}>
      <Icon className="h-10 w-10 text-gray-400 mx-auto mb-3" />
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-4">{description}</p>
      
      {action && (
        <Button 
          variant="outline" 
          onClick={action.onClick}
          className="mt-2"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};
