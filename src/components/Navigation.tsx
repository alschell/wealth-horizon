
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
  const [languageProviderReady, setLanguageProviderReady] = React.useState(false);

  // Try to access the language context, but handle the case where it's not available
  React.useEffect(() => {
    try {
      // Just access the language context to verify it's available
      const { language } = useLanguage();
      console.log('Navigation: Language provider is ready, language =', language);
      setLanguageProviderReady(true);
    } catch (error) {
      console.error('Navigation: Language provider not ready yet');
      setLanguageProviderReady(false);
    }
  }, []);

  // If navigation should be hidden, return null
  if (shouldHideNavigation) {
    return null;
  }

  // If LanguageProvider is not available, don't render navigation
  if (!languageProviderReady) {
    console.log('Navigation: Not rendering navigation because language provider is not ready');
    return null;
  }

  // Determine which navigation to render based on the current route
  return isHomePage ? <HomeNavigation /> : <DashboardNavigation />;
};

export default Navigation;
