
import { useCallback } from "react";
import { toast } from "sonner";

/**
 * List of valid application routes
 */
const validRoutes = [
  '/dashboard',
  '/analyze-wealth',
  '/market-data',
  '/profile',
  '/settings',
  '/notifications',
  '/advice',
  '/cashflow',
  '/reporting',
  '/integrations',
  '/documents',
  '/esg',
  '/tax-optimization',
  '/legacy-planning',
  '/entity-management',
  '/compliance-monitoring',
  '/client-portal',
  '/trading',
  '/credit-facilities',
  '/reports'
];

/**
 * Hook for validating and sanitizing route paths
 */
export const useValidRoutes = () => {
  /**
   * Check if a route is valid
   * 
   * @param route The route to validate
   * @returns Boolean indicating if the route is valid
   */
  const isValidRoute = useCallback((route: string): boolean => {
    // Sanitize route to ensure it starts with a slash
    const sanitizedRoute = route.startsWith('/') ? route : `/${route}`;
    
    // Check if it's a valid route or starts with a valid route prefix
    return validRoutes.some(validRoute => 
      sanitizedRoute === validRoute || sanitizedRoute.startsWith(`${validRoute}/`)
    );
  }, []);

  /**
   * Get a valid route path, with fallback to dashboard
   * 
   * @param route The route to validate and sanitize
   * @returns A valid route path
   */
  const getValidRoute = useCallback((route: string): string => {
    // Sanitize route to ensure it starts with a slash
    const sanitizedRoute = route.startsWith('/') ? route : `/${route}`;
    
    // Return the route if valid, otherwise default to dashboard
    if (isValidRoute(sanitizedRoute)) {
      return sanitizedRoute;
    } 
    
    // Show warning toast and redirect to dashboard
    console.warn(`Invalid notification link: ${sanitizedRoute}, redirecting to dashboard`);
    toast.warning("That page doesn't exist yet. Redirecting to dashboard.");
    return "/dashboard";
  }, [isValidRoute]);

  return { isValidRoute, getValidRoute };
};
