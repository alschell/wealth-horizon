
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface DefaultErrorFallbackProps {
  error?: Error;
}

export const DefaultErrorFallback: React.FC<DefaultErrorFallbackProps> = ({ error }) => {
  return (
    <Alert variant="destructive" className="m-4">
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>
        {error?.message || 'An unexpected error occurred'}
      </AlertDescription>
    </Alert>
  );
};
