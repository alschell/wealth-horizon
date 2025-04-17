
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  House,
  LineChart,
  Settings,
  PresentationChart,
  Calculator,
  CreditCard,
  Calendar,
  MessageSquare,
  Activity,
  HeartHandshake,
  UsersFour,
  ChatCenteredText,
  Database,
  CurrencyCircleDollar
} from '@phosphor-icons/react';

type NavItemProps = {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  onClick?: () => void;
};

const NavItem = ({ href, icon: Icon, children, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <NavLink
      to={href}
      onClick={onClick}
      className={cn(
        'flex items-center text-sm px-3 py-2 rounded-md transition-colors',
        isActive 
          ? 'bg-black text-white dark:bg-white dark:text-black font-medium'
          : 'text-gray-600 hover:text-black hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
      )}
    >
      <Icon className="h-5 w-5 mr-2" weight={isActive ? "fill" : "regular"} />
      <span>{children}</span>
    </NavLink>
  );
};

const DashboardNavigation = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className="p-4 space-y-6">
      <nav className="space-y-1">
        <NavItem href="/dashboard" icon={House} onClick={onClose}>
          Dashboard
        </NavItem>
        <NavItem href="/market-data" icon={LineChart} onClick={onClose}>
          Market Data
        </NavItem>
        <NavItem href="/wealth-analysis" icon={PresentationChart} onClick={onClose}>
          Wealth Analysis
        </NavItem>
        <NavItem href="/cashflow" icon={CurrencyCircleDollar} onClick={onClose}>
          Cashflow
        </NavItem>
        <NavItem href="/planning" icon={Calculator} onClick={onClose}>
          Planning
        </NavItem>
        <NavItem href="/lending" icon={CreditCard} onClick={onClose}>
          Lending
        </NavItem>
      </nav>

      <div className="pt-2">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
          Engagement
        </h4>
        <nav className="space-y-1">
          <NavItem href="/calendar" icon={Calendar} onClick={onClose}>
            Calendar
          </NavItem>
          <NavItem href="/messaging" icon={MessageSquare} onClick={onClose}>
            Messaging
          </NavItem>
          <NavItem href="/activity" icon={Activity} onClick={onClose}>
            Activity
          </NavItem>
          <NavItem href="/advice" icon={HeartHandshake} onClick={onClose}>
            Advice
          </NavItem>
        </nav>
      </div>

      <div className="pt-2">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
          Admin
        </h4>
        <nav className="space-y-1">
          <NavItem href="/client-portal" icon={UsersFour} onClick={onClose}>
            Client Portal
          </NavItem>
          <NavItem href="/documents" icon={ChatCenteredText} onClick={onClose}>
            Documents
          </NavItem>
          <NavItem href="/data-management" icon={Database} onClick={onClose}>
            Data Management
          </NavItem>
          <NavItem href="/settings" icon={Settings} onClick={onClose}>
            Settings
          </NavItem>
        </nav>
      </div>
    </div>
  );
};

export default DashboardNavigation;
