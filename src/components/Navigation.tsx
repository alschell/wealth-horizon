
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigationRoutes } from './navigation/useNavigationRoutes';
import { HomeNavigation, DashboardNavigation } from './navigation';

/**
 * Main navigation component that conditionally renders the appropriate
 * navigation variant based on the current route
 */
const Navigation: React.FC = () => {
  const location = useLocation();
  const { isHomePage, shouldHideNavigation } = useNavigationRoutes(location);

  // If navigation should be hidden, return null
  if (shouldHideNavigation) {
    return null;
  }

  // Determine which navigation to render based on the current route
  return isHomePage ? <HomeNavigation /> : <DashboardNavigation />;
};

export default Navigation;
