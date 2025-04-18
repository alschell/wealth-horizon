
import React from 'react';
import { useRouteError } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const RouteErrorBoundary = () => {
  const error = useRouteError();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <AlertTriangle className="w-12 h-12 mx-auto text-red-500" />
        <h1 className="text-2xl font-bold">Oops! Something went wrong</h1>
        <p className="text-gray-600">
          {error instanceof Error ? error.message : 'An unexpected error occurred'}
        </p>
        <Button
          onClick={() => window.location.href = '/'}
          className="mt-4"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
};
