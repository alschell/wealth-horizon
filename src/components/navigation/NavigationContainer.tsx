
import React from 'react';
import { useLocation } from 'react-router-dom';
import HomeNavigation from './HomeNavigation';
import DashboardNavigation from './DashboardNavigation';
import { useNavigationRoutes } from './useNavigationRoutes';

const NavigationContainer: React.FC = () => {
  const location = useLocation();
  const { 
    isHomePage,
    shouldHideNavigation
  } = useNavigationRoutes(location);

  // If navigation should be hidden, return null
  if (shouldHideNavigation) {
    return null;
  }

  // Determine which navigation to render based on the current route
  if (isHomePage) {
    return <HomeNavigation />;
  }

  return <DashboardNavigation />;
};

export default NavigationContainer;
