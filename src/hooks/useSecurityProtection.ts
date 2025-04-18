
import { useEffect } from 'react';
import { sessionManager, CsrfProtection } from '@/utils/security';

export function useSecurityProtection() {
  useEffect(() => {
    // Initialize session management
    sessionManager.initSession();
    
    // Generate initial CSRF token
    if (!CsrfProtection.getStoredToken()) {
      CsrfProtection.generateToken();
    }

    // Cleanup on unmount
    return () => {
      sessionManager.cleanup();
    };
  }, []);

  return {
    getRequestHeaders: CsrfProtection.getRequestHeaders,
    validateToken: CsrfProtection.validateToken,
    appendTokenToForm: CsrfProtection.appendTokenToForm,
  };
}

