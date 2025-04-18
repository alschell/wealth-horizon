
import { type RouteObject } from 'react-router-dom';
import { Dashboard } from '@/components/dashboard';
import { TradingInterface } from '@/components/trading';
import { MarketDataInterface } from '@/components/market';
import { ReportingInterface } from '@/components/reporting';
import { SettingsInterface } from '@/components/settings';

export const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/trading',
    element: <TradingInterface />,
  },
  {
    path: '/market',
    element: <MarketDataInterface />,
  },
  {
    path: '/reports',
    element: <ReportingInterface />,
  },
  {
    path: '/settings',
    element: <SettingsInterface />,
  },
];
