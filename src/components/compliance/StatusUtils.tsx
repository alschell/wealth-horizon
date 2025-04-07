
import React from 'react';
import { StatusIndicator } from '@/components/ui/status-indicator';

export const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "success";
    case "pending":
      return "warning";
    case "overdue":
      return "error";
    default:
      return "neutral";
  }
};

export const getPriorityLabel = (priority: string) => {
  switch (priority) {
    case "high":
      return "High Priority";
    case "medium":
      return "Medium Priority";
    case "low":
      return "Low Priority";
    default:
      return "Normal Priority";
  }
};

export const RenderStatusIndicator = ({ 
  status, 
  priority 
}: { 
  status: string; 
  priority: string 
}) => (
  <StatusIndicator 
    type={getStatusColor(status)} 
    size="sm" 
    label={getPriorityLabel(priority)} 
  />
);
