
import { useEffect } from 'react';

export function useBrowserCompatibility() {
  useEffect(() => {
    const isLocalStorageAvailable = (() => {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch (e) {
        return false;
      }
    })();
    
    if (!isLocalStorageAvailable) {
      console.warn("LocalStorage is not available - caching functionality will be limited");
    }
    
    if (!window.fetch) {
      console.error("Fetch API is not available in this browser");
    }
    
    if (!window.requestAnimationFrame) {
      console.warn("requestAnimationFrame is not available - animations may not work properly");
    }
  }, []);
}
