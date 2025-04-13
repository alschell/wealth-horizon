
import { useCallback, useMemo } from 'react';
import { Location } from 'react-router-dom';

// Separate constant arrays outside component to prevent recreation on each render
const FOOTER_PAGES = [
  '/about', 
  '/portfolio-management', 
  '/trading', 
  '/analyze-wealth', 
  '/reporting', 
  '/compliance-monitoring', 
  '/blog', 
  '/press', 
  '/careers', 
  '/documentation', 
  '/help-center', 
  '/security', 
  '/privacy-policy', 
  '/terms-of-service', 
  '/cookies-policy',
  '/careers/faq',
  '/api-docs', 
  '/developer-portal', 
  '/sdk',
  '/user-guides', 
  '/support-ticket', 
  '/community-forum',
  '/team'
];

const HIDDEN_PATH_PREFIXES = [
  '/api-docs/', 
  '/developer-portal/', 
  '/sdk/', 
  '/help-center/'
];

export const useNavigationRoutes = (location: Location) => {
  // Check if path starts with any of the hidden prefixes
  const pathStartsWithHidden = useCallback((path: string) => {
    return HIDDEN_PATH_PREFIXES.some(prefix => path.startsWith(prefix));
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
    
    const isFooterPage = FOOTER_PAGES.includes(pathname) || pathStartsWithHidden(pathname);
    
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
