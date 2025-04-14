
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigationRoutes } from './navigation/useNavigationRoutes';
import { HomeNavigation, DashboardNavigation } from './navigation';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Main navigation component that conditionally renders the appropriate
 * navigation variant based on the current route
 */
const Navigation: React.FC = () => {
  const location = useLocation();
  const { isHomePage, shouldHideNavigation } = useNavigationRoutes(location);

  // Try to access the language context, but handle the case where it's not available
  try {
    // Just access the language context to verify it's available
    useLanguage();
  } catch (error) {
    // If LanguageProvider is not available, don't render navigation
    return null;
  }

  // If navigation should be hidden, return null
  if (shouldHideNavigation) {
    return null;
  }

  // Determine which navigation to render based on the current route
  return isHomePage ? <HomeNavigation /> : <DashboardNavigation />;
};

export default Navigation;
