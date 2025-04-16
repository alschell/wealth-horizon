
import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface BuildError {
  type: string;
  message: string;
}

export const BuildStatusCheck: React.FC = () => {
  const [buildErrors, setBuildErrors] = useState<BuildError[]>([]);

  useEffect(() => {
    const checkBuildStatus = () => {
      const errors: BuildError[] = [];

      // Check for critical dependencies
      const criticalDependencies = [
        'react', 
        'react-dom', 
        'vite', 
        'lucide-react', 
        'typescript'
      ];

      criticalDependencies.forEach(dep => {
        try {
          // @ts-ignore
          const module = window[dep] || require(dep);
          if (!module) {
            errors.push({
              type: 'Dependency Error',
              message: `Critical dependency missing: ${dep}`
            });
          }
        } catch (error) {
          errors.push({
            type: 'Dependency Error',
            message: `Cannot load dependency: ${dep}`
          });
        }
      });

      // Check for environment configuration
      if (!import.meta.env.VITE_APP_TITLE) {
        errors.push({
          type: 'Environment Error',
          message: 'Missing VITE_APP_TITLE in .env configuration'
        });
      }

      setBuildErrors(errors);
    };

    checkBuildStatus();
  }, []);

  if (buildErrors.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-4 z-50">
      <div className="flex items-center">
        <AlertTriangle className="mr-2" />
        <h2 className="font-bold">Build Errors Detected</h2>
      </div>
      <ul className="list-disc pl-6 mt-2">
        {buildErrors.map((error, index) => (
          <li key={index} className="text-sm">
            <strong>{error.type}</strong>: {error.message}
          </li>
        ))}
      </ul>
      <p className="text-xs mt-2">
        Please check your project configuration and dependencies.
      </p>
    </div>
  );
};
