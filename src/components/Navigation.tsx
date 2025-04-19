
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigationRoutes } from './navigation/useNavigationRoutes';
import { HomeNavigation, DashboardNavigation } from './navigation';

/**
 * Main navigation component that conditionally renders the appropriate
 * navigation variant based on the current route.
 * 
 * Uses route detection to determine which navigation component to render
 * and whether navigation should be visible at all.
 */
const Navigation: React.FC = () => {
  const location = useLocation();
  const { isHomePage, shouldHideNavigation } = useNavigationRoutes(location);

  // If navigation should be hidden (like on auth pages), return null
  if (shouldHideNavigation) {
    return null;
  }

  // Render the appropriate navigation component based on current route
  return isHomePage ? <HomeNavigation /> : <DashboardNavigation />;
};

export default Navigation;
