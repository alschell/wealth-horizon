
import React from 'react';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { ComplianceStatus, PriorityLevel } from './types';

// Status color mapping
export const getStatusColor = (status: ComplianceStatus): "success" | "warning" | "error" | "info" | "neutral" => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'in_progress':
      return 'info';
    case 'pending':
      return 'warning';
    case 'overdue':
      return 'error';
    case 'not_started':
      return 'neutral';
    default:
      return 'neutral';
  }
};

// Priority label mapping
export const getPriorityLabel = (priority: PriorityLevel): string => {
  switch (priority) {
    case 'high':
      return 'High Priority';
    case 'medium':
      return 'Medium Priority';
    case 'low':
      return 'Low Priority';
    default:
      return 'Normal Priority';
  }
};

// Status indicator component
interface StatusIndicatorProps {
  status: ComplianceStatus;
  priority?: PriorityLevel;
  showLabel?: boolean;
}

export const RenderStatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  priority,
  showLabel = true
}) => {
  const statusType = getStatusColor(status);
  const label = showLabel ? (priority ? getPriorityLabel(priority) : getStatusLabel(status)) : undefined;
  
  return (
    <StatusIndicator 
      type={statusType} 
      size="sm" 
      label={label} 
    />
  );
};

// Status label mapping
export const getStatusLabel = (status: ComplianceStatus): string => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in_progress':
      return 'In Progress';
    case 'pending':
      return 'Pending';
    case 'overdue':
      return 'Overdue';
    case 'not_started':
      return 'Not Started';
    default:
      return 'Unknown Status';
  }
};

// Function to get impact type
export const getImpactType = (impact: string): "error" | "warning" | "info" => {
  switch (impact) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    default:
      return 'info';
  }
};
