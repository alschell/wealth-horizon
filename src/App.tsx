
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { publicRoutes, dashboardRoutes } from './routes';
import { RouteErrorBoundary } from '@/components/error-boundary/RouteErrorBoundary';
import { GlobalErrorBoundary } from '@/components/error-boundary/GlobalErrorBoundary';

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
      <RouterProvider router={router} />
    </GlobalErrorBoundary>
  );
}

export default App;
