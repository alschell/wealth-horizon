
import { useCallback, useMemo } from 'react';
import { Location } from 'react-router-dom';
import { ROUTES_CONFIG } from './routesConfig';

export const useNavigationRoutes = (location: Location) => {
  // Check if path starts with any of the hidden prefixes
  const pathStartsWithHidden = useCallback((path: string) => {
    return ROUTES_CONFIG.HIDDEN_PATH_PREFIXES.some(prefix => path.startsWith(prefix));
  }, []);

  // Memoize all route determinations to prevent unnecessary recalculations
  return useMemo(() => {
    const { pathname } = location;
    
    const isOnboarding = pathname.includes('/onboarding');
    const isHomePage = pathname === '/';
    const isLoginPage = pathname === '/login';
    const isResetPasswordPage = pathname === '/reset-password';
    const isJobDetailPage = !!pathname.match(/^\/careers\/\d+$/);
    const isTeamPage = pathname === '/team';
    
    const isFooterPage = ROUTES_CONFIG.FOOTER_PAGES.includes(pathname) || pathStartsWithHidden(pathname);
    
    // Determine if navigation should be hidden completely
    const shouldHideNavigation = isOnboarding || isLoginPage || isResetPasswordPage || isFooterPage || isJobDetailPage || isTeamPage;
    
    // Determine if we're in the dashboard section
    const isDashboard = !isOnboarding && !isHomePage && !isLoginPage && !isResetPasswordPage && !isFooterPage && !isJobDetailPage && !isTeamPage;
    
    return {
      isOnboarding,
      isHomePage,
      isLoginPage,
      isResetPasswordPage,
      isJobDetailPage,
      isTeamPage,
      isFooterPage,
      isDashboard,
      shouldHideNavigation
    };
  }, [location, pathStartsWithHidden]);
};
