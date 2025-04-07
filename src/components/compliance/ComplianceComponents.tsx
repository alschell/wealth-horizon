
import React from 'react';
import { ComplianceHeader } from './ComplianceHeader';
import { ComplianceOverview } from './ComplianceOverview';
import { ComplianceFilings } from './ComplianceFilings';
import { ComplianceChanges } from './ComplianceChanges';
import { ComplianceCalendar } from './ComplianceCalendar';
import { getStatusColor, getPriorityLabel, RenderStatusIndicator } from './StatusUtils';

// We can also add more shared components here in the future

export {
  ComplianceHeader,
  ComplianceOverview,
  ComplianceFilings,
  ComplianceChanges,
  ComplianceCalendar,
  getStatusColor,
  getPriorityLabel,
  RenderStatusIndicator
};
