
import { type RouteObject } from 'react-router-dom';
import { Dashboard } from '@/components/dashboard';
import TradingInterface from '@/components/trading/TradingInterface';
import MarketDataInterface from '@/components/market/MarketDataInterface';
import ReportingInterface from '@/components/reporting/ReportingInterface';
import SettingsInterface from '@/components/settings/SettingsInterface';

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
