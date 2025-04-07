
import React from 'react';
import { StatusIndicator } from '@/components/ui/status-indicator';

export type ComplianceStatus = 'completed' | 'pending' | 'overdue' | 'in-progress' | string;
export type PriorityLevel = 'high' | 'medium' | 'low' | string;

export const getStatusColor = (status: ComplianceStatus): "success" | "warning" | "error" | "neutral" | "info" => {
  switch (status.toLowerCase()) {
    case "completed":
      return "success";
    case "pending":
    case "in-progress":
      return "warning";
    case "overdue":
      return "error";
    default:
      return "neutral";
  }
};

export const getPriorityLabel = (priority: PriorityLevel): string => {
  switch (priority.toLowerCase()) {
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

interface StatusIndicatorProps { 
  status: ComplianceStatus; 
  priority: PriorityLevel;
}

export const RenderStatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  priority 
}) => (
  <StatusIndicator 
    type={getStatusColor(status)} 
    size="sm" 
    label={getPriorityLabel(priority)} 
  />
);
