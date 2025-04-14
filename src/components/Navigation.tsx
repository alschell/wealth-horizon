
import React, { useState, useEffect } from 'react';
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
  const [languageProviderReady, setLanguageProviderReady] = useState(false);

  // Try to access the language context, but handle the case where it's not available
  useEffect(() => {
    let isMounted = true;
    
    try {
      // Just access the language context to verify it's available
      const context = useLanguage();
      if (isMounted) {
        console.log('Navigation: Language provider is ready, language =', context.language);
        setLanguageProviderReady(true);
      }
    } catch (error) {
      if (isMounted) {
        console.error('Navigation: Language provider not ready yet, will render without waiting');
        // Render navigation even if language provider is not ready
        setLanguageProviderReady(true);
      }
    }
    
    return () => {
      isMounted = false;
    };
  }, []);

  // If navigation should be hidden, return null
  if (shouldHideNavigation) {
    return null;
  }

  // Always render navigation, even if language context is not available
  // We've added fallback text in the navigation components
  return isHomePage ? <HomeNavigation /> : <DashboardNavigation />;
};

export default Navigation;
