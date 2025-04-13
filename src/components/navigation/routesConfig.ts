
/**
 * Application route configuration
 * Centralizes route definitions for better maintainability
 */

export const ROUTES_CONFIG = {
  // Pages that should use the footer layout
  FOOTER_PAGES: [
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
  ],

  // Path prefixes that should hide navigation
  HIDDEN_PATH_PREFIXES: [
    '/api-docs/', 
    '/developer-portal/', 
    '/sdk/', 
    '/help-center/'
  ],

  // Special routes
  HOME: '/',
  LOGIN: '/login',
  RESET_PASSWORD: '/reset-password',
  ONBOARDING: '/onboarding'
};
