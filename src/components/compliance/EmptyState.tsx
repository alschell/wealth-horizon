
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon: Icon, 
  title, 
  description 
}) => {
  return (
    <div className="text-center py-12">
      <Icon className="h-10 w-10 text-gray-400 mx-auto mb-3" />
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
    </div>
  );
};
