
import React, { useState, useEffect } from 'react';
import { AlertTriangle, XCircle, CheckCircle, RefreshCw } from 'lucide-react';

interface BuildError {
  type: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  code?: string;
  suggestion?: string;
}

export const BuildStatusCheck: React.FC = () => {
  const [buildErrors, setBuildErrors] = useState<BuildError[]>([]);
  const [isChecking, setIsChecking] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkBuildStatus = () => {
    setIsChecking(true);
    const errors: BuildError[] = [];

    // Check for critical dependencies
    const criticalDependencies = [
      { name: 'react', required: true },
      { name: 'react-dom', required: true },
      { name: 'vite', required: true },
      { name: 'lucide-react', required: true },
      { name: 'typescript', required: true },
      { name: '@tanstack/react-query', required: false },
      { name: 'tailwindcss', required: false }
    ];

    criticalDependencies.forEach(dep => {
      try {
        // @ts-ignore
        const module = window[dep.name] || require(dep.name);
        if (!module) {
          errors.push({
            type: 'Dependency Error',
            message: `Critical dependency missing: ${dep.name}`,
            severity: dep.required ? 'error' : 'warning',
            code: 'DEP_MISSING',
            suggestion: `Run npm install ${dep.name}`
          });
        }
      } catch (error) {
        errors.push({
          type: 'Dependency Error',
          message: `Cannot load dependency: ${dep.name}`,
          severity: dep.required ? 'error' : 'warning',
          code: 'DEP_LOAD_FAIL',
          suggestion: `Check if ${dep.name} is installed correctly with npm list ${dep.name}`
        });
      }
    });

    // Check for environment configuration
    const requiredEnvVars = [
      { name: 'VITE_APP_TITLE', description: 'Application title' },
      { name: 'VITE_API_URL', description: 'API URL' }
    ];

    requiredEnvVars.forEach(envVar => {
      // @ts-ignore - Accessing dynamic environment variables
      if (!import.meta.env[envVar.name]) {
        errors.push({
          type: 'Environment Error',
          message: `Missing ${envVar.name} in .env configuration`,
          severity: 'error',
          code: 'ENV_MISSING',
          suggestion: `Add ${envVar.name}=${envVar.description} to your .env file`
        });
      }
    });

    // Check for browser compatibility
    const requiredFeatures = [
      { name: 'ResizeObserver', description: 'Modern layout APIs' },
      { name: 'IntersectionObserver', description: 'Lazy loading support' },
      { name: 'fetch', description: 'Network requests' }
    ];

    requiredFeatures.forEach(feature => {
      if (typeof window !== 'undefined' && !(feature.name in window)) {
        errors.push({
          type: 'Compatibility Error',
          message: `Browser missing ${feature.name} support`,
          severity: 'warning',
          code: 'COMPAT_MISSING',
          suggestion: `Consider adding a polyfill for ${feature.name}`
        });
      }
    });

    // Check for runtime errors
    try {
      if (window.hasOwnProperty('__RUNTIME_ERRORS__')) {
        // @ts-ignore
        const runtimeErrors = window.__RUNTIME_ERRORS__ || [];
        runtimeErrors.forEach((error: any) => {
          errors.push({
            type: 'Runtime Error',
            message: error.message || 'Unknown runtime error',
            severity: 'error',
            code: 'RUNTIME_ERROR',
            suggestion: error.suggestion || 'Check the console for more details'
          });
        });
      }
    } catch (e) {
      console.warn('Could not check for runtime errors', e);
    }

    setBuildErrors(errors);
    setIsChecking(false);
    setLastChecked(new Date());
  };

  useEffect(() => {
    checkBuildStatus();
    
    // Set up a periodic check every 5 minutes
    const intervalId = setInterval(() => {
      checkBuildStatus();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (buildErrors.length === 0) {
    return null;
  }

  const hasErrors = buildErrors.some(error => error.severity === 'error');
  const statusColor = hasErrors ? 'bg-red-500' : 'bg-yellow-500';

  return (
    <div className={`fixed top-0 left-0 w-full ${statusColor} text-white p-4 z-50`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {hasErrors ? (
            <XCircle className="mr-2" />
          ) : (
            <AlertTriangle className="mr-2" />
          )}
          <h2 className="font-bold">
            {hasErrors ? 'Build Errors Detected' : 'Build Warnings Detected'}
          </h2>
        </div>
        <button 
          onClick={() => checkBuildStatus()}
          className="p-1 rounded hover:bg-white/20 transition-colors"
          aria-label="Refresh build status check"
          disabled={isChecking}
        >
          <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <ul className="list-disc pl-6 mt-2 space-y-2">
        {buildErrors.map((error, index) => (
          <li key={index} className="text-sm">
            <div className="flex items-start">
              {error.severity === 'error' ? (
                <XCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
              ) : error.severity === 'warning' ? (
                <AlertTriangle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
              ) : (
                <CheckCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <strong>{error.type}</strong>: {error.message}
                {error.code && <span className="ml-1 text-xs opacity-75">({error.code})</span>}
                {error.suggestion && (
                  <div className="text-xs mt-1 opacity-90">
                    Suggestion: {error.suggestion}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="flex justify-between items-center mt-3 text-xs">
        <p>Please check your project configuration and dependencies.</p>
        {lastChecked && (
          <p>Last checked: {lastChecked.toLocaleTimeString()}</p>
        )}
      </div>
    </div>
  );
};
