
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes, dashboardRoutes } from './routes';
import { RouteErrorBoundary } from '@/components/error-boundary/RouteErrorBoundary';
import { GlobalErrorBoundary } from '@/components/error-boundary/GlobalErrorBoundary';
import { TranslationProvider } from '@/context/TranslationContext';

const router = createBrowserRouter([
  ...publicRoutes,
  ...dashboardRoutes
].map(route => ({
  ...route,
  errorElement: <RouteErrorBoundary />
})));

function App() {
  return (
    <GlobalErrorBoundary>
      <TranslationProvider>
        <RouterProvider router={router} />
      </TranslationProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
